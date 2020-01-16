import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { Friend } from '../../../contracts/db/friend';
import { FriendState } from './friend.state';
import { FriendStore } from './friend.store';

@Injectable({
	providedIn: 'root'
})
export class FriendQuery extends QueryEntity<FriendState, Friend> {
	constructor(protected store: FriendStore) {
		super(store);
	}
}
