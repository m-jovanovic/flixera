import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { of, Subscription } from 'rxjs';
import { first, catchError, map, mergeMap } from 'rxjs/operators';

import { MovieApiService } from './movie-api.service';
import { ApiResponseModel, emptyApiResponse } from '../../contracts/models/api-response.model';
import { MovieListItemModel } from '../../contracts/models/move-list-item.model';
import { Movie } from '../../contracts/db/movie';
import { MovieSearchStore } from '../../store/movies/movie-search/movie-search.store';
import { initialMovieSearchState } from '../../store/movies/movie-search/movie-search.store';
import { AuthQuery } from '../../store/auth/auth.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class MovieSearchService extends MovieApiService implements OnDestroy {
	private moviesCollection: AngularFirestoreCollection<Movie>;
	private subscription: Subscription;

	constructor(
		protected http: HttpClient,
		private movieSearchStore: MovieSearchStore,
		private firestore: AngularFirestore,
		private authQuery: AuthQuery,
		private snackBar: MatSnackBar
	) {
		super(http);

		this.moviesCollection = this.firestore.collection('movies', (ref) => ref.where('userId', '==', this.authQuery.getUserId()));

		this.subscribeToMoviesCollectionStateChanges();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	async searchMovies(search: string, page?: number): Promise<void> {
		if (page === undefined) {
			page = 1;
		}

		const queryString = `s=${search}&type=movie&page=${page}`;

		this.movieSearchStore.setLoading(true);

		const response = await this.get<ApiResponseModel>(queryString)
			.pipe(
				first(),
				catchError((_) => {
					console.error('Error happened while fetching movies from API.');

					return of(emptyApiResponse);
				})
			)
			.toPromise();

		await this.updateMoviesStore(response, search, page);

		this.movieSearchStore.setLoading(false);
	}

	clearMovies(): void {
		this.movieSearchStore.update(initialMovieSearchState);
	}

	private subscribeToMoviesCollectionStateChanges(): void {
		this.subscription = this.moviesCollection
			.stateChanges()
			.pipe(
				mergeMap((actions) => actions),
				map((action) => {
					const movieId = action.payload.doc.data().movieId;

					const inLibrary = action.type === 'added' || action.type === 'modified';

					this.updateMovieInStore(movieId, inLibrary);
				})
			)
			.subscribe();
	}

	private async updateMoviesStore(response: ApiResponseModel, search: string, page: number): Promise<void> {
		this.showSnackBar(response.Response, response.Error, search);

		if (this.emptyMovieStoreIfBadResponse(response)) {
			return;
		}

		const movies = await this.createMoviesArray(response, page);

		this.movieSearchStore.update({
			searchTerm: search,
			movies,
			page,
			hasMore: movies.length < response.totalResults
		});
	}

	private emptyMovieStoreIfBadResponse(response: ApiResponseModel): boolean {
		if (response.Response === 'True' && response.Error === undefined) {
			return false;
		}

		this.clearMovies();

		return true;
	}

	private async createMoviesArray(response: ApiResponseModel, page: number): Promise<MovieListItemModel[]> {
		const currentMovies = this.movieSearchStore.getValue().movies;

		const newMoviesPromises = response.Search.map(async (m) => {
			let inLibrary = false;
			try {
				const doc = await this.getMovieDocument(m.imdbID);

				inLibrary = doc.exists;
			} catch (e) {
				console.log((e as Error).message);
			}

			return {
				id: m.imdbID,
				title: m.Title,
				posterURL: m.Poster,
				inLibrary
			} as MovieListItemModel;
		});

		const newMovies = await Promise.all(newMoviesPromises);

		const movies = page === 1 ? newMovies : currentMovies.concat(newMovies);

		return movies;
	}

	private getMovieDocument(movieId: string): Promise<firebase.firestore.DocumentSnapshot<DocumentData>> {
		const movieUid = `${this.authQuery.getUserId()}-${movieId}`;

		return this.moviesCollection.doc(movieUid).get().pipe(first()).toPromise();
	}

	private updateMovieInStore(movieId: string, inLibrary: boolean): void {
		this.movieSearchStore.update((state) => {
			const movieToUpdate = state.movies.find((m) => m.id === movieId);

			if (movieToUpdate === undefined) {
				return;
			}

			const indexOfMovie = state.movies.indexOf(movieToUpdate);

			if (indexOfMovie < 0) {
				return;
			}

			const movies = [...state.movies];

			movies.splice(indexOfMovie, 1, {
				id: movieToUpdate.id,
				title: movieToUpdate.title,
				posterURL: movieToUpdate.posterURL,
				inLibrary
			});

			return {
				movies
			};
		});
	}

	private showSnackBar(status: string, error: string | undefined, searchTerm: string): void {
		let message = '';
		if (status === 'False' && error !== '') {
			message = `No movies were found matching the search term "${searchTerm}".`;
		} else if (status === 'False') {
			message = 'An unexpected error ocurred, please try again later.';
		}

		if (message) {
			this.snackBar.open(message, '', {
				duration: 3000
			});
		}
	}
}
