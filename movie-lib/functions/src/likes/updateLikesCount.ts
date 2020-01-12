import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

import { database } from '../db';

export function updateLikesCount(snapshot: DocumentSnapshot) {
	const userId = snapshot.get('userId');
	const movieId = snapshot.get('movieId');

    const movieDocId = `${userId}-${movieId}`;
    
	const movieRef = database.collection('movies').doc(movieDocId);

	const likesRef = movieRef.collection('likes');

	return database.runTransaction(async transaction => {
		const likesQuery = await transaction.get(likesRef);

		const likesCount = likesQuery.size;

		return transaction.update(movieRef, {
			likesCount
		});
	});
}
