import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { User } from '../../contracts/db/user';
import { CollectionNames } from '../../contracts/enums/collection-names.enum';
import { AuthQuery } from '../../store/auth/auth.query';
import { FriendSearchStore } from '../../store/friends/friend-search/friend-search.store';
import { SearchUser } from '../../contracts/db/search-user';
import { FriendService } from './friend.service';

@Injectable({
	providedIn: 'root'
})
export class FriendSearchService {
	constructor(
		private firestore: AngularFirestore,
		private authQuery: AuthQuery,
		private friendSearchStore: FriendSearchStore,
		private friendService: FriendService
	) {}

	searchFriends(start: string, end: string): void {
		this.friendSearchStore.setLoading(true);

		const userId = this.authQuery.getUserId();

		this.getUsersCollectionObservable(start, end)
			.pipe(
				first(),
				map((users: User[]) => users.filter((u) => u.uid !== userId))
			)
			.subscribe(async (users) => {
				const usersPromise = users.map(async (user) => {
					return {
						uid: user.uid,
						displayName: user.displayName,
						email: user.email,
						photoURL: user.photoURL,
						isFriend: await this.friendService.isFriend(userId, user.uid)
					} as SearchUser;
				});

				const searchUsers = await Promise.all(usersPromise);

				this.friendSearchStore.set(searchUsers);

				this.friendSearchStore.setLoading(false);
			});
	}

	clearFriends(): void {
		this.friendSearchStore.set([]);
	}

	private getUsersCollectionObservable(start: string, end: string): Observable<User[]> {
		return this.firestore
			.collection<User>(CollectionNames.Users, (ref) => ref.orderBy('email').startAt(start).endAt(end))
			.valueChanges();
	}
}
