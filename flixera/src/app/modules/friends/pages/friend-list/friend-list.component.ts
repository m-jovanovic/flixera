import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { Friend, FriendService, FriendQuery } from '@app/core';

@Component({
	selector: 'ml-friend-list',
	templateUrl: './friend-list.component.html',
	styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
	friends$: Observable<Friend[]>;
	isSmallScreen$: Observable<BreakpointState>;

	constructor(
		// We have to inject FriendService for the Firestore connection to be set up.
		private friendService: FriendService,
		private friendQuery: FriendQuery,
		private router: Router,
		private breakpointObserver: BreakpointObserver
	) {}

	ngOnInit() {
		this.friends$ = this.friendQuery.selectAll();

		this.isSmallScreen$ = this.breakpointObserver.observe('(min-width: 700px)');
	}

	async viewFriendLibrary(friendId: string): Promise<boolean> {
		return await this.router.navigate(['/friends/library', friendId]);
	}

	trackByFunction(_: any, item: any): any {
		return item.friendId;
	}
}
