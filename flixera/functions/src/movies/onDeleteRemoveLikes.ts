import * as functions from 'firebase-functions';

import { database } from '../db';

export const onMovieDeleteRemoveLikes = functions
	.region('europe-west1')
	.firestore.document('movies/{movieId}')
	.onDelete((document) => {
        const likesRef = document.ref.collection('movie-likes');

        return database.runTransaction(async transaction => {
            const likesQuery = await likesRef.get();

            likesQuery.docs.forEach(likeDoc => {
                transaction.delete(likeDoc.ref);
            });
        })
    });
