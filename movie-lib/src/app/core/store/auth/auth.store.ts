import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { AuthState } from './auth.state';

export const initialState: AuthState = {
    user: null
};

@StoreConfig({ name: 'auth' })
@Injectable({
	providedIn: 'root'
})
export class AuthStore extends Store<AuthState> {
	constructor() {
		super(initialState);
    }
}
