import { Injectable, OnDestroy } from '@angular/core';
import {
	AngularFirestoreCollection,
	AngularFirestore
} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { Movie } from '../../contracts/db/movie';
import { AuthQuery } from '../../store/auth/auth.query';
import { MovieLibraryStore } from '../../store/movies/movie-library/movie-library.store';
import { FriendLibraryStore } from '../../store/friends/friend-library/friend-library.store';
import { first, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class MovieLibraryService implements OnDestroy {
	private moviesCollection: AngularFirestoreCollection<Movie>;
	private subscription: Subscription;

	constructor(
		private firestore: AngularFirestore,
		private authQuery: AuthQuery,
		private movieLibraryStore: MovieLibraryStore,
		private friendLibrary: FriendLibraryStore
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

	getFriendsLibrary(friendId: string): void {
		const collection = this.firestore.collection<Movie>('movies', ref =>
			ref.where('userId', '==', friendId)
		);

		collection
			.get()
			.pipe(
				first(),
				map(snapshot => snapshot.docs.map(d => d.data()))
			)
			.subscribe((movies: Movie[]) => {
				this.friendLibrary.set(movies);
			});
	}

	async addToLibrary(
		movieId: string,
		title: string,
		posterURL: string
	): Promise<void> {
		const id = this.getMovieDocId(movieId);

		const movieInLibrary: Movie = {
			userId: this.authQuery.getUserId(),
			movieId,
			title,
			posterURL: posterURL,
			likesCount: 0
		};

		await this.moviesCollection.doc<Movie>(id).set(movieInLibrary);

		this.movieLibraryStore.add(movieInLibrary);
	}

	async removeFromLibrary(movieId: string): Promise<void> {
		const id = this.getMovieDocId(movieId);

		await this.moviesCollection.doc<Movie>(id).delete();

		this.movieLibraryStore.remove(id);
	}

	private getMovieDocId(movieId: string): string {
		const userId = this.authQuery.getUserId();

		return `${userId}-${movieId}`;
	}
}
