import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { SettingsState } from './settings.state';

export const initialState: SettingsState = {
	lightMode: true
};

@StoreConfig({ name: 'settings' })
@Injectable({
	providedIn: 'root'
})
export class SettingsStore extends Store<SettingsState> {
	constructor() {
		super(initialState);
	}
}
