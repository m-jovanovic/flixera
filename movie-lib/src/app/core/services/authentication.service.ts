import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
	AngularFirestore,
	AngularFirestoreDocument
} from '@angular/fire/firestore';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { AuthStore } from '../store/auth/auth.store';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
	private subscription: Subscription;

	constructor(
		private fireAuth: AngularFireAuth,
		private firestore: AngularFirestore,
		private authStore: AuthStore,
		private router: Router
	) {
		this.subscribeToFireAuthAuthState();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	async googleSignIn(): Promise<void> {
		try {
			const provider = new auth.GoogleAuthProvider();

			const credential = await this.fireAuth.auth.signInWithPopup(provider);

			this.router.navigate(['/']);

			return this.updateUserData(credential.user);
		} catch (error) {
			console.error(error);
		}
	}

	async signOut(): Promise<boolean> {
		try {
			await this.fireAuth.auth.signOut();

			return this.router.navigate(['/login']);
		} catch (error) {
			console.error(error);
		}
	}

	private subscribeToFireAuthAuthState(): void {
		this.subscription = this.fireAuth.authState
			.pipe(
				switchMap(user => {
					if (user) {
						const userUid = `users/${user.uid}`;

						return this.firestore.doc<User>(userUid).valueChanges();
					} else {
						return of(null);
					}
				})
			)
			.subscribe((user: User) => {
				this.authStore.update({
					user
				});
			});
	}

	private updateUserData(user: User): Promise<void> {
		const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
			`users/${user.uid}`
		);

		const data = {
			uid: user.uid,
			email: user.email,
			photoURL: user.photoURL,
			displayName: user.displayName
		};

		return userRef.set(data, {
			merge: true
		});
	}
}
