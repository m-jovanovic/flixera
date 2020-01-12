import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Like } from '../../contracts/db/like';
import { AuthQuery } from '../../store/auth/auth.query';
import { FriendLibraryStore } from '../../store/friends/friend-library/friend-library.store';

@Injectable({
	providedIn: 'root'
})
export class MovieLikesService {
	constructor(
		private firestore: AngularFirestore,
		private authQuery: AuthQuery,
		private friendLibraryStore: FriendLibraryStore
	) {}

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

		this.friendLibraryStore.update(movieId, movie => ({
			likesCount: !movie.likesCount ? 1 : movie.likesCount + 1
		}));
	}

	private getLikesCollection(
		friendId: string,
		movieId: string
	): AngularFirestoreCollection<Like> {
		return this.firestore.collection(`movies/${friendId}-${movieId}/likes`);
	}
}
