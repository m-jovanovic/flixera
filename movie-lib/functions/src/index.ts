import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

import { onLikeCreate } from './likes/onCreate';
export { onLikeCreate };

import { onLikeDelete } from './likes/onDelete';
export { onLikeDelete };
