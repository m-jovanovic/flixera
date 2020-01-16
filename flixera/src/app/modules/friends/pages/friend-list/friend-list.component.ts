import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Friend, FriendService, FriendQuery } from '@app/core';
import { Router } from '@angular/router';

@Component({
	selector: 'ml-friend-list',
	templateUrl: './friend-list.component.html',
	styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
	friends$: Observable<Friend[]>;

	constructor(
		private friendService: FriendService,
		private friendQuery: FriendQuery,
		private router: Router
	) {}

	ngOnInit() {
		this.friends$ = this.friendQuery.selectAll();
	}

	async viewFriendLibrary(friendId: string): Promise<boolean> {
		return await this.router.navigate(['/friends/library', friendId]);
	}

	trackByFunction(_index: any, item: any): any {
		return item.friendId;
	}
}
