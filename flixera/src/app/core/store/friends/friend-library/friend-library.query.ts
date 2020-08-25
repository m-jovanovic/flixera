import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { FriendLibraryState } from './friend-library.state';
import { Movie } from '../../../contracts/db/movie';
import { FriendLibraryStore } from './friend-library.store';

@Injectable({
	providedIn: 'root'
})
export class FriendLibraryQuery extends QueryEntity<FriendLibraryState, Movie> {
	constructor(protected store: FriendLibraryStore) {
		super(store);
	}
}
