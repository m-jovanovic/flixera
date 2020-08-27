import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { FriendLibraryState } from './friend-library.state';
import { FriendMovie } from '../../../contracts/db/friend-movie';
import { FriendLibraryStore } from './friend-library.store';

@Injectable({
	providedIn: 'root'
})
export class FriendLibraryQuery extends QueryEntity<FriendLibraryState, FriendMovie> {
	constructor(protected store: FriendLibraryStore) {
		super(store);
	}

	isLiked(movieId: string): boolean {
		return this.getEntity(movieId).liked;
	}
}
