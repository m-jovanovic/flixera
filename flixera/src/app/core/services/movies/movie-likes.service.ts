import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Like } from '../../contracts/db/like';
import { CollectionNames } from '../../contracts/enums/collection-names.enum';
import { AuthQuery } from '../../store/auth/auth.query';
import { FriendLibraryStore } from '../../store/friends/friend-library/friend-library.store';
import { first } from 'rxjs/internal/operators/first';

@Injectable({
	providedIn: 'root'
})
export class MovieLikesService {
	constructor(private firestore: AngularFirestore, private authQuery: AuthQuery, private friendLibraryStore: FriendLibraryStore) {}

	async like(friendId: string, movieId: string): Promise<void> {
		const likesCollection = this.getLikesCollection(friendId, movieId);

		const userId = this.authQuery.getUserId();

		const doc: Like = {
			userId: friendId,
			friendId: userId,
			movieId,
			timestamp: Date.now()
		};

		await likesCollection.doc<Like>(userId).set(doc);

		this.friendLibraryStore.update(movieId, (movie) => ({
			likesCount: !movie.likesCount ? 1 : movie.likesCount + 1,
			liked: true
		}));
	}

	async unlike(friendId: string, movieId: string): Promise<void> {
		const likesCollection = this.getLikesCollection(friendId, movieId);

		const userId = this.authQuery.getUserId();

		await likesCollection.doc<Like>(userId).delete();

		this.friendLibraryStore.update(movieId, (movie) => ({
			likesCount: !movie.likesCount ? 0 : movie.likesCount - 1,
			liked: false
		}));
	}

	async isLiked(userId: string, friendId: string, movieId: string): Promise<boolean> {
		const likesCollection = this.getLikesCollection(friendId, movieId);

		const doc = await likesCollection.doc(userId).get().pipe(first()).toPromise();

		return doc.exists;
	}

	private getLikesCollection(userId: string, movieId: string): AngularFirestoreCollection<Like> {
		return this.firestore.collection(`${CollectionNames.Movies}/${userId}-${movieId}/${CollectionNames.MovieLikes}`);
	}
}
