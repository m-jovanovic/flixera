import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
	FriendRequest,
	FriendRequestsService,
	FriendRequestsQuery
} from '@app/core';

@Component({
	selector: 'ml-friend-requests',
	templateUrl: './friend-requests.component.html',
	styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {
	friendRequests$: Observable<FriendRequest[]>;

	constructor(
		private friendRequestsService: FriendRequestsService,
		private friendRequestsQuery: FriendRequestsQuery
	) {}

	ngOnInit(): void {
		this.friendRequests$ = this.friendRequestsQuery.selectAll();
	}

	async acceptFriendRequest(friendRequest: FriendRequest): Promise<void> {
		await this.friendRequestsService.acceptFriendRequest(friendRequest);
	}

	async rejectFriendRequest(friendId: string): Promise<void> {
		await this.friendRequestsService.rejectFriendRequest(friendId);
	}

	trackByFunction(_: any, item: any): any {
		return item.friendId;
	}
}
