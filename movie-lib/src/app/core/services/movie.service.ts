import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Subscription } from 'rxjs';
import { first, catchError, map, mergeMap, debounceTime } from 'rxjs/operators';
import {
	AngularFirestoreCollection,
	AngularFirestore
} from '@angular/fire/firestore';

import { MovieApiService } from './movie-api.service';
import { MovieModel } from '../models/movie.model';
import { MovieDetailsModel } from '../models/movie-details.model';
import { MovieInLibrary } from '../models/movie-in-library';
import { MovieDetailsStore } from '../store/movie-details/movie-details.store';
import { AuthQuery } from '../store/auth/auth.query';

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

	getById(id: string): void {
		const queryString = `i=${id}&type=movie&plot=full`;

		this.movieDetailsStore.setLoading(true);

		this.get<MovieModel>(queryString)
			.pipe(
				first(),
				map(m => {
					this.subscribeToMovieInLibraryDocument(m.imdbID);

					return {
						id: m.imdbID,
						title: m.Title,
						plot: m.Plot,
						year: m.Year,
						genre: m.Genre,
						posterUrl: m.Poster,
						inLibrary: false
					} as MovieDetailsModel;
				}),
				debounceTime(50),
				catchError(_ => {
					console.error('Error happened while fetching movie from API');

					return of(null);
				})
			)
			.subscribe((movie: MovieDetailsModel) => {
				this.movieDetailsStore.add(movie);

				this.movieDetailsStore.setLoading(false);
			});
	}

	async addToLibrary(id: string): Promise<void> {
		const userId = this.authQuery.getUserId();

		const uid = `${userId}-${id}`;

		return await this.moviesCollection.doc<MovieInLibrary>(uid).set({
			userId,
			movieId: id
		});
	}

	async removeFromLibrary(id: string): Promise<void> {
		const userId = this.authQuery.getUserId();

		const uid = `${userId}-${id}`;

		return await this.moviesCollection.doc(uid).delete();
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

	private subscribeToMovieInLibraryDocument(movieId: string) {
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
		this.movieDetailsStore.update(movieId, {
			inLibrary
		});
	}
}
