import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { User } from '../../contracts/db/user';
import { FriendSearchState } from './friend-search.state';

@StoreConfig({
	name: 'friend-search',
	idKey: 'uid'
})
@Injectable({
	providedIn: 'root'
})
export class FriendSearchStore extends EntityStore<FriendSearchState, User> {
	constructor() {
		super();
	}
}
