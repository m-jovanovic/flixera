import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	AngularFirestore,
	AngularFirestoreCollection
} from '@angular/fire/firestore';
import { of, Subscription } from 'rxjs';
import { first, catchError, map, mergeMap } from 'rxjs/operators';

import { MovieApiService } from './movie-api.service';
import {
	ApiResponseModel,
	emptyApiResponse
} from '../models/api-response.model';
import { MovieListItemModel } from '../models/move-list-item.model';
import { MovieInLibrary } from '../models/movie-in-library';
import { MovieSearchStore } from '../store/movie-search/movie-search.store';
import { initialMovieSearchState } from '../store/movie-search/movie-search.store';
import { AuthQuery } from '../store/auth/auth.query';

@Injectable({
	providedIn: 'root'
})
export class SearchService extends MovieApiService implements OnDestroy {
	private moviesCollection: AngularFirestoreCollection<MovieInLibrary>;
	private subscription: Subscription;

	constructor(
		protected http: HttpClient,
		private movieSearchStore: MovieSearchStore,
		private firestore: AngularFirestore,
		private authQuery: AuthQuery
	) {
		super(http);

		this.moviesCollection = this.firestore.collection('movies', ref =>
			ref.where('userId', '==', this.authQuery.getUserId())
		);

		this.subscribeToMoviesCollectionStateChanges();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	searchMovies(search: string, page?: number): void {
		if (page == undefined) {
			page = 1;
		}

		const queryString = `s=${search}&type=movie&page=${page}`;

		this.movieSearchStore.setLoading(true);

		this.get<ApiResponseModel>(queryString)
			.pipe(
				first(),
				catchError(_ => {
					console.error('Error happened while fetching movies from API.');

					return of(emptyApiResponse);
				})
			)
			.subscribe(response => {
				this.updateMoviesStore(response, search, page);

				this.movieSearchStore.setLoading(false);
			});
	}

	clearMovies(): void {
		this.movieSearchStore.update(initialMovieSearchState);
	}

	private subscribeToMoviesCollectionStateChanges(): void {
		this.subscription = this.moviesCollection
			.stateChanges()
			.pipe(
				mergeMap(actions => actions),
				map(action => {
					const movieId = action.payload.doc.data().movieId;

					const inLibrary = action.type == 'added';

					this.updateMovieInStore(movieId, inLibrary);
				})
			)
			.subscribe();
	}

	private updateMoviesStore(
		response: ApiResponseModel,
		search: string,
		page: number
	): void {
		if (this.emptyMovieStoreIfBadResponse(response, search, page)) {
			return;
		}

		const movies = this.createMoviesArray(response, page);

		this.movieSearchStore.update({
			searchTerm: search,
			movies: movies,
			page: page,
			hasMore: movies.length < response.totalResults
		});
	}

	private emptyMovieStoreIfBadResponse(
		response: ApiResponseModel,
		search: string,
		page: number
	): boolean {
		if (response.Response == 'True' && response.Error == undefined) {
			return false;
		}

		this.movieSearchStore.update({
			searchTerm: search,
			movies: [],
			page: page,
			hasMore: false
		});

		return true;
	}

	private createMoviesArray(
		response: ApiResponseModel,
		page: number
	): MovieListItemModel[] {
		const currentMovies = this.movieSearchStore.getValue().movies;

		const newMovies = response.Search.map(m => {
			this.subscribeToMovieInLibraryDocument(m.imdbID);

			return {
				id: m.imdbID,
				title: m.Title,
				posterUrl: m.Poster,
				inLibrary: false
			} as MovieListItemModel;
		});

		const movies = page == 1 ? newMovies : currentMovies.concat(newMovies);

		return movies;
	}

	private subscribeToMovieInLibraryDocument(movieId: string): void {
		const movieUid = `${this.authQuery.getUserId()}-${movieId}`;

		this.moviesCollection
			.doc(movieUid)
			.get()
			.pipe(first())
			.subscribe(doc => {
				if (doc.exists) {
					this.updateMovieInStore(doc.data().movieId, true);
				}
			});
	}

	private updateMovieInStore(movieId: string, inLibrary: boolean): void {
		this.movieSearchStore.update(state => {
			const movieToUpdate = state.movies.find(m => m.id == movieId);

			if (movieToUpdate == undefined) {
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
				posterUrl: movieToUpdate.posterUrl,
				inLibrary
			});

			return {
				movies
			};
		});
	}
}
