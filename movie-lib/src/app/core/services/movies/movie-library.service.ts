import { Injectable, OnDestroy } from '@angular/core';
import {
	AngularFirestoreCollection,
	AngularFirestore
} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { Movie } from '../../contracts/db/movie';
import { AuthQuery } from '../../store/auth/auth.query';
import { MovieLibraryStore } from '../../store/movies/movie-library/movie-library.store';

@Injectable({
	providedIn: 'root'
})
export class MovieLibraryService implements OnDestroy {
	private moviesCollection: AngularFirestoreCollection<Movie>;
	private subscription: Subscription;

	constructor(
		private firestore: AngularFirestore,
		private authQuery: AuthQuery,
		private movieLibraryStore: MovieLibraryStore
	) {
		this.moviesCollection = this.firestore.collection('movies', ref =>
			ref.where('userId', '==', this.authQuery.getUserId()).orderBy('title')
		);

		this.subscription = this.moviesCollection
			.valueChanges()
			.subscribe((movies: Movie[]) => {
				this.movieLibraryStore.set(movies);
			});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	async addToLibrary(
		movieId: string,
		title: string,
		posterURL: string
	): Promise<void> {
		const userId = this.authQuery.getUserId();

		const id = `${userId}-${movieId}`;

		const movieInLibrary: Movie = {
			userId,
			movieId,
			title,
			posterURL: posterURL,
			likesCount: 0
		};

		await this.moviesCollection.doc<Movie>(id).set(movieInLibrary);

		this.movieLibraryStore.add(movieInLibrary);
	}

	async removeFromLibrary(movieId: string): Promise<void> {
		const userId = this.authQuery.getUserId();

		const uid = `${userId}-${movieId}`;

		await this.moviesCollection.doc<Movie>(uid).delete();

		this.movieLibraryStore.remove(uid);
	}
}
