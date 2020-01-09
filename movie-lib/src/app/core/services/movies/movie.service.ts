import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Subscription } from 'rxjs';
import { first, catchError, map, mergeMap } from 'rxjs/operators';
import {
	AngularFirestoreCollection,
	AngularFirestore,
	DocumentData
} from '@angular/fire/firestore';

import { MovieApiService } from './movie-api.service';
import { MovieModel } from '../../models/movie.model';
import { MovieDetailsModel } from '../../models/movie-details.model';
import { MovieInLibrary } from '../../models/movie-in-library';
import { MovieDetailsStore } from '../../store/movie-details/movie-details.store';
import { AuthQuery } from '../../store/auth/auth.query';

@Injectable({
	providedIn: 'root'
})
export class MovieService extends MovieApiService implements OnDestroy {
	private moviesCollection: AngularFirestoreCollection<MovieInLibrary>;
	private subscription: Subscription;

	constructor(
		protected http: HttpClient,
		private movieDetailsStore: MovieDetailsStore,
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

	async getById(id: string): Promise<void> {
		const queryString = `i=${id}&type=movie&plot=full`;

		this.movieDetailsStore.setLoading(true);

		const movie: MovieDetailsModel = await this.get<MovieModel>(queryString)
			.pipe(
				first(),
				map(async m => {
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
						plot: m.Plot,
						year: m.Year,
						genre: m.Genre,
						posterUrl: m.Poster,
						inLibrary
					} as MovieDetailsModel;
				}),
				catchError(_ => {
					console.error('Error happened while fetching movie from API');

					return of(null);
				})
			)
			.toPromise();

		this.movieDetailsStore.add(movie);

		this.movieDetailsStore.setLoading(false);
	}

	private subscribeToMoviesCollectionStateChanges(): void {
		this.subscription = this.moviesCollection
			.stateChanges()
			.pipe(
				mergeMap(actions => actions),
				map(action => {
					const data = action.payload.doc.data();

					const movieId = data.movieId;

					const inLibrary = action.type == 'added' || action.type == 'modified';

					this.updateMovieInStore(movieId, inLibrary);
				})
			)
			.subscribe();
	}

	private getMovieDocument(
		movieId: string
	): Promise<firebase.firestore.DocumentSnapshot<DocumentData>> {
		const movieUid = `${this.authQuery.getUserId()}-${movieId}`;

		return this.moviesCollection
			.doc(movieUid)
			.get()
			.pipe(first())
			.toPromise();
	}

	private updateMovieInStore(movieId: string, inLibrary: boolean): void {
		this.movieDetailsStore.update(movieId, {
			inLibrary
		});
	}
}
