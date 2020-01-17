import { Injectable } from '@angular/core';

import { SettingsStore } from '../../store/settings/settings.store';
import { SettingsQuery } from '../../store/settings/settings.query';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {
	constructor(
		private settingsStore: SettingsStore,
		private settingsQuery: SettingsQuery
	) {}

	toggleLightMode(): void {
		const lightMode = !this.settingsQuery.isLightMode;

		this.settingsStore.update({
			lightMode
		});
	}
}
