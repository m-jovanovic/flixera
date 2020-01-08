import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { User } from '../../models/user';
import { AuthQuery } from '@app/core/store/auth/auth.query';
import { FriendSearchStore } from '@app/core/store/friend-search/friend-search.store';

@Injectable({
	providedIn: 'root'
})
export class FriendSearchService {
	constructor(
		private firestore: AngularFirestore,
		private authQuery: AuthQuery,
		private friendSearchStore: FriendSearchStore
	) {}

	searchFriends(start: string, end: string): void {
		this.friendSearchStore.setLoading(true);

		this.firestore
			.collection<User>('users', ref =>
				ref
					.orderBy('email')
					.startAt(start)
					.endAt(end)
			)
			.valueChanges()
			.pipe(
				first(),
				map((users: User[]) =>
					users.filter(u => u.uid !== this.authQuery.getUserId())
				)
			)
			.subscribe(users => {
				this.friendSearchStore.set(users);

				this.friendSearchStore.setLoading(false);
			});
	}

	clearFriends(): void {
		this.friendSearchStore.set([]);
	}
}
