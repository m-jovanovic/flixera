import * as functions from 'firebase-functions';
import { database } from '../db';

export const onLikeCreate = functions
	.region('europe-west1')
	.firestore.document('likes/{likeId}')
	.onCreate(snapshot => {
		const userId = snapshot.get('userId');
		const movieId = snapshot.get('movieId');

		const movieRef = database.collection('movies').doc(`${userId}-${movieId}`);

		const likesRef = database
			.collection('likes')
			.where('movieId', '==', movieId);

		return database.runTransaction(async transaction => {
			const likesQuery = await transaction.get(likesRef);

			const likesCount = likesQuery.size;

			return transaction.update(movieRef, {
				likesCount
			});
		});
	});
