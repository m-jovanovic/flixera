import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { database } from '../db';

export const onLikeWriteUpdateMovieLikesCount = functions
	.region('europe-west1')
	.firestore.document('movies/{movieId}/movie-likes/{likeId}')
	.onWrite((change) => {
		let increment, data;
		if (!change.before.exists) {
			increment = 1;
			data = change.after.data();
		} else if (!change.after.exists) {
			increment = -1;
			data = change.before.data();
		}

		if (!increment || !data) {
			return null;
		}

		const userId = data.userId;
		const movieId = data.movieId;

		const movieDocId = `${userId}-${movieId}`;

		const movieRef = database.collection('movies').doc(movieDocId);

		return movieRef.update({
			likesCount: admin.firestore.FieldValue.increment(increment)
		});
	});
