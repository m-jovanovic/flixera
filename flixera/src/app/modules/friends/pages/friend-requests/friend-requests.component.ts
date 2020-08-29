import { Component, OnInit } from '@angular/core';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { FriendRequest, FriendRequestsService, FriendRequestsQuery } from '@app/core';

@Component({
	selector: 'ml-friend-requests',
	templateUrl: './friend-requests.component.html',
	styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {
	friendRequests$: Observable<FriendRequest[]>;
	isSmallScreen$: Observable<BreakpointState>;

	constructor(
		private friendRequestsService: FriendRequestsService,
		private friendRequestsQuery: FriendRequestsQuery,
		private breakpointObserver: BreakpointObserver
	) {}

	ngOnInit(): void {
		this.friendRequests$ = this.friendRequestsQuery.selectAll();

		this.isSmallScreen$ = this.breakpointObserver.observe('(min-width: 700px)');
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
