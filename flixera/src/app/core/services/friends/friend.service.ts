import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/internal/operators/first';

import { User } from '../../contracts/db/user';
import { Friend } from '../../contracts/db/friend';
import { CollectionNames } from '../../contracts/enums/collection-names.enum';
import { AuthQuery } from '../../store/auth/auth.query';
import { FriendStore } from '../../store/friends/friend/friend.store';

@Injectable({
	providedIn: 'root'
})
export class FriendService implements OnDestroy {
	private subscription: Subscription;
	friendsCollection: AngularFirestoreCollection<Friend>;

	constructor(private firestore: AngularFirestore, private authQuery: AuthQuery, private friendStore: FriendStore) {
		this.friendsCollection = this.firestore.collection(this.getFriendsCollectionPathForUserId(this.authQuery.getUserId()));

		this.subscription = this.friendsCollection.valueChanges().subscribe((friends: Friend[]) => {
			this.friendStore.set(friends);
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	async addFriend(userId: string, userToAddAsFriend: User, timestamp: number): Promise<void> {
		const friend: Friend = {
			userId,
			friendId: userToAddAsFriend.uid,
			friendDisplayName: userToAddAsFriend.displayName,
			friendEmail: userToAddAsFriend.email,
			friendPhotoURL: userToAddAsFriend.photoURL,
			timestamp
		};

		await this.getFriendsCollection(userId).doc<Friend>(friend.friendId).set(friend);
	}

	async isFriend(userId: string, friendId: string): Promise<boolean> {
		const friendsCollection = this.getFriendsCollection(userId);

		const doc = await friendsCollection.doc(friendId).get().pipe(first()).toPromise();

		return doc.exists;
	}

	private getFriendsCollection(userId: string) {
		return this.firestore.collection(this.getFriendsCollectionPathForUserId(userId));
	}

	private getFriendsCollectionPathForUserId(userId: string): string {
		return `${CollectionNames.Users}/${userId}/${CollectionNames.Friends}`;
	}
}
