import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { User } from 'firebase';
import { FriendSearchState } from './friend-search.state';
import { FriendSearchStore } from './friend-search.store';

@Injectable({
	providedIn: 'root'
})
export class FriendSearchQuery extends QueryEntity<FriendSearchState, User> {
	constructor(protected store: FriendSearchStore) {
		super(store);
	}
}
