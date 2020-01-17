import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { SettingsState } from './settings.state';
import { SettingsStore } from './settings.store';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SettingsQuery extends Query<SettingsState> {
	isLightMode$: Observable<boolean> = this.select(state => state.lightMode);

	constructor(protected store: SettingsStore) {
		super(store);
    }
    
    get isLightMode(): boolean {
        return this.getValue().lightMode;
    }
}
