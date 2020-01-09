import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthQuery } from '@app/core/store/auth/auth.query';

import { Like } from '../../contracts/db/like';

@Injectable({
	providedIn: 'root'
})
export class MovieLikesService {
	likesCollection: AngularFirestoreCollection<Like>;

	constructor(
		private firestore: AngularFirestore,
		private authQuery: AuthQuery
	) {
		this.likesCollection = this.firestore.collection('likes', ref =>
			ref.where('userId', '==', this.authQuery.getUserId())
		);
	}

	async like(movieId: string): Promise<void> {
		const userId = this.authQuery.getUserId();

		const uid = `${userId}-${movieId}`;

		const doc = {
			movieId,
			userId,
			timestamp: Date.now()
		};

		await this.likesCollection.doc<Like>(uid).set(doc);
	}
}
