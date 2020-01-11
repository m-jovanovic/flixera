import { Injectable, OnDestroy } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { FriendRequest } from '../../contracts/db/friend-request';
import { User } from '../../contracts/db/user';
import { AuthQuery } from '../../store/auth/auth.query';
import { FriendRequestsStore } from '../../store/friends/friend-requests/friend-requests.store';
import { FriendService } from './friend.service';

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
		private friendService: FriendService
	) {
		this.friendRequestsCollection = this.firestore.collection(
			`users/${this.authQuery.getUserId()}/friend-requests`,
			ref => ref.orderBy('timestamp', 'desc')
		);

		this.subscription = this.friendRequestsCollection
			.valueChanges()
			.subscribe((friendRequests: FriendRequest[]) => {
				this.friendRequestsStore.set(friendRequests);
			});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	async sendFriendRequest(
		friendId: string
	): Promise<void> {
		const user = this.authQuery.getUser();

		const friendRequest: FriendRequest = {
			userId: friendId,
			friendId: user.uid,
			friendEmail: user.email,
			friendDisplayName: user.displayName,
			friendPhotoURL: user.photoURL,
			timestamp: Date.now()
		};

		await this.firestore
			.collection(`users/${friendId}/friend-requests`)
			.doc<FriendRequest>(user.uid)
			.set(friendRequest);
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
		}

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
}
