import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { FriendRequest } from '../../contracts/db/friend-request';
import { User } from '../../contracts/db/user';
import { CollectionNames } from '../../contracts/enums/collection-names.enum';
import { AuthQuery } from '../../store/auth/auth.query';
import { FriendRequestsStore } from '../../store/friends/friend-requests/friend-requests.store';
import { FriendService } from './friend.service';
import { first } from 'rxjs/internal/operators/first';
import { FriendSearchStore } from '@app/core/store/friends/friend-search/friend-search.store';
import { filter } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class FriendRequestsService implements OnDestroy {
	private friendRequestsCollection: AngularFirestoreCollection<FriendRequest>;
	private subscription: Subscription;

	constructor(
		private firestore: AngularFirestore,
		private authQuery: AuthQuery,
		private friendRequestsStore: FriendRequestsStore,
		private friendSearchStore: FriendSearchStore,
		private friendService: FriendService
	) {
		this.friendRequestsCollection = this.firestore.collection(this.getFriendRequestsCollectionPath(this.authQuery.getUserId()), (ref) =>
			ref.orderBy('timestamp', 'desc')
		);

		this.subscription = this.friendRequestsCollection.valueChanges().subscribe((friendRequests: FriendRequest[]) => {
			this.friendRequestsStore.set(friendRequests);
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	async sendFriendRequest(friendId: string): Promise<void> {
		const user = this.authQuery.getUser();

		const friendRequest: FriendRequest = {
			userId: friendId,
			friendId: user.uid,
			friendEmail: user.email,
			friendDisplayName: user.displayName,
			friendPhotoURL: user.photoURL,
			timestamp: Date.now()
		};

		await this.getFriendRequestsCollection(friendId).doc<FriendRequest>(user.uid).set(friendRequest);

		this.friendSearchStore.update(friendId, {
			friendRequestSent: true
		});
	}

	async isFriendRequestSent(friendId: string): Promise<boolean> {
		const friendRequestsCollection = this.getFriendRequestsCollection(friendId);

		const currentUserRequest = await friendRequestsCollection.doc(this.authQuery.getUserId()).get().pipe(first()).toPromise();

		const friendsRequest = await this.friendRequestsCollection.doc(friendId).get().pipe(first()).toPromise();

		return currentUserRequest.exists || friendsRequest.exists;
	}

	async acceptFriendRequest(friendRequest: FriendRequest): Promise<void> {
		await this.deleteFriendRequest(friendRequest.friendId);

		const user = this.authQuery.getUser();

		const timestamp = Date.now();

		const friend: User = {
			uid: friendRequest.friendId,
			displayName: friendRequest.friendDisplayName,
			email: friendRequest.friendEmail,
			photoURL: friendRequest.friendPhotoURL
		};

		await this.friendService.addFriend(user.uid, friend, timestamp);

		await this.friendService.addFriend(friendRequest.friendId, user, timestamp);
	}

	async rejectFriendRequest(friendId: string): Promise<void> {
		await this.deleteFriendRequest(friendId);
	}

	private async deleteFriendRequest(friendId: string): Promise<void> {
		await this.friendRequestsCollection.doc(friendId).delete();

		this.friendRequestsStore.remove(friendId);
	}

	private getFriendRequestsCollection(userId: string): AngularFirestoreCollection<FriendRequest> {
		return this.firestore.collection<FriendRequest>(this.getFriendRequestsCollectionPath(userId));
	}

	private getFriendRequestsCollectionPath(userId: string): string {
		return `${CollectionNames.Users}/${userId}/${CollectionNames.FriendRequests}`;
	}
}
