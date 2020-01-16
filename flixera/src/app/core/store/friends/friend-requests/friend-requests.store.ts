import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { FriendRequestsState } from './friend-requests.state';
import { FriendRequest } from '../../../contracts/db/friend-request';

@StoreConfig({
	name: 'friend-requests',
	idKey: 'userId'
})
@Injectable({
	providedIn: 'root'
})
export class FriendRequestsStore extends EntityStore<
	FriendRequestsState,
	FriendRequest
> {
	constructor() {
		super();
	}
}
