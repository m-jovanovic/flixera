import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

import { onMovieDeleteRemoveLikes } from './movies';
export { onMovieDeleteRemoveLikes };

import { onLikeWriteUpdateMovieLikesCount } from './likes';
export { onLikeWriteUpdateMovieLikesCount };
