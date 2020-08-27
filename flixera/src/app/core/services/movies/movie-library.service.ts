import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { Movie } from '../../contracts/db/movie';
import { FriendMovie } from '../../contracts/db/friend-movie';
import { CollectionNames } from '../../contracts/enums/collection-names.enum';
import { AuthQuery } from '../../store/auth/auth.query';
import { MovieLibraryStore } from '../../store/movies/movie-library/movie-library.store';
import { FriendLibraryStore } from '../../store/friends/friend-library/friend-library.store';
import { first, map } from 'rxjs/operators';
import { MovieLikesService } from './movie-likes.service';

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
		private friendLibrary: FriendLibraryStore,
		private likesService: MovieLikesService
	) {
		this.moviesCollection = this.getMoviesCollectionForUserId(this.authQuery.getUserId());

		this.subscription = this.moviesCollection.valueChanges().subscribe((movies: Movie[]) => {
			this.movieLibraryStore.set(movies);
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	getFriendsLibrary(friendId: string): void {
		const userId = this.authQuery.getUserId();
		const collection = this.getMoviesCollectionForUserId(friendId);

		this.friendLibrary.set([]);
		this.friendLibrary.setLoading(true);

		collection
			.get()
			.pipe(
				first(),
				map((snapshot) => snapshot.docs.map((doc) => doc.data())),
				map((movies: Movie[]) => {
					return movies.map((movie) => {
						return {
							movieId: movie.movieId,
							userId: movie.userId,
							title: movie.title,
							posterURL: movie.posterURL,
							likesCount: movie.likesCount,
							liked: false
						} as FriendMovie;
					});
				})
			)
			.subscribe(async (friendMovies: FriendMovie[]) => {
				const moviesPromise = await friendMovies.map(async movie => {
					movie.liked = await this.likesService.isLiked(userId, friendId, movie.movieId);

					return movie;
				});

				const movies = await Promise.all(moviesPromise);

				this.friendLibrary.set(movies);
			});
	}

	async addToLibrary(movieId: string, title: string, posterURL: string): Promise<void> {
		const id = this.createMovieDocId(movieId);

		const movieInLibrary: Movie = {
			userId: this.authQuery.getUserId(),
			movieId,
			title,
			posterURL,
			likesCount: 0
		};

		await this.moviesCollection.doc<Movie>(id).set(movieInLibrary);

		this.movieLibraryStore.add(movieInLibrary);
	}

	async removeFromLibrary(movieId: string): Promise<void> {
		const id = this.createMovieDocId(movieId);

		await this.moviesCollection.doc<Movie>(id).delete();

		this.movieLibraryStore.remove(id);
	}

	private getMoviesCollectionForUserId(userId: string): AngularFirestoreCollection<Movie> {
		return this.firestore.collection<Movie>(this.getMoviesCollectionPath(), (ref) => ref.where('userId', '==', userId));
	}

	private createMovieDocId(movieId: string): string {
		const userId = this.authQuery.getUserId();

		return `${userId}-${movieId}`;
	}

	private getMoviesCollectionPath(): string {
		return CollectionNames.Movies;
	}
}
