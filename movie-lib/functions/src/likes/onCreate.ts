import * as functions from 'firebase-functions';

import { updateLikesCount } from './updateLikesCount';

export const onLikeCreate = functions
	.region('europe-west1')
	.firestore.document('movies/{movieId}/likes/{likeId}')
	.onCreate(updateLikesCount);
