import { Injectable, OnDestroy } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { User } from '../../contracts/db/user';
import { Friend } from '../../contracts/db/friend';
import { AuthQuery } from '../../store/auth/auth.query';
import { FriendStore } from '../../store/friends/friend/friend.store';

@Injectable({
	providedIn: 'root'
})
export class FriendService implements OnDestroy {
	private subscription: Subscription;
	friendsCollection: AngularFirestoreCollection<Friend>;

	constructor(
		private firestore: AngularFirestore,
		private authQuery: AuthQuery,
		private friendStore: FriendStore
	) {
		this.friendsCollection = this.firestore.collection(
			`users/${this.authQuery.getUserId()}/friends`
		);

		this.subscription = this.friendsCollection
			.valueChanges()
			.subscribe((friends: Friend[]) => {
				this.friendStore.set(friends);
			});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	async addFriend(
		userId: string,
		userToAddAsFriend: User,
		timestamp: number
	): Promise<void> {
		const friend: Friend = {
			userId,
			friendId: userToAddAsFriend.uid,
			friendDisplayName: userToAddAsFriend.displayName,
			friendEmail: userToAddAsFriend.email,
			friendPhotoURL: userToAddAsFriend.photoURL,
			timestamp: timestamp
		};

		await this.firestore
			.collection(`users/${userId}/friends`)
			.doc<Friend>(friend.friendId)
			.set(friend);
	}
}
