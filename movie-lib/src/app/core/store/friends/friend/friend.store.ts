import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { FriendState } from './friend.state';

import { Friend } from '../../../contracts/db/friend';

@StoreConfig({
	name: 'friend',
	idKey: 'friendId'
})
@Injectable({
	providedIn: 'root'
})
export class FriendStore extends EntityStore<FriendState, Friend> {
	constructor() {
		super();
	}
}
