import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { FriendRequest } from '../../../contracts/db/friend-request';
import { FriendRequestsState } from './friend-requests.state';
import { FriendRequestsStore } from './friend-requests.store';

@Injectable({
	providedIn: 'root'
})
export class FriendRequestsQuery extends QueryEntity<
	FriendRequestsState,
	FriendRequest
> {
	constructor(protected store: FriendRequestsStore) {
		super(store);
	}
}
