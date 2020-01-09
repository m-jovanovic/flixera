import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { Observable } from 'rxjs';

import { User } from '../../contracts/db/user';
import { AuthState } from './auth.state';
import { AuthStore } from './auth.store';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthQuery extends Query<AuthState> {
	loggedIn$: Observable<boolean> = this.select(state => state.user).pipe(
		map(user => toBoolean(user))
	);

	user$: Observable<User> = this.select(state => state.user);

	constructor(protected store: AuthStore) {
		super(store);
	}

	getUserId(): string {
		const user = this.getValue().user;

		return user ? user.uid : '';
	}
}
