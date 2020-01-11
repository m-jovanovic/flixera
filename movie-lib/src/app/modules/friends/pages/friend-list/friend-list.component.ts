import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Friend, FriendService, FriendQuery } from '@app/core';

@Component({
	selector: 'ml-friend-list',
	templateUrl: './friend-list.component.html',
	styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
	friends$: Observable<Friend[]>;

	constructor(
		private friendService: FriendService,
		private friendQuery: FriendQuery
	) {}

	ngOnInit() {
		this.friends$ = this.friendQuery.selectAll();
	}

	trackByFunction(_index: any, item: any): any {
		return item.friendId;
	}
}
