import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

import { onLikeCreate, onLikeDelete } from './likes';
export { onLikeCreate, onLikeDelete };
