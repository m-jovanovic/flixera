import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SettingsService, SettingsQuery } from '@app/core';

@Component({
	selector: 'ml-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	isLightMode$: Observable<boolean>;

	constructor(
		private settingsService: SettingsService,
		private settingsQuery: SettingsQuery
	) {}

	ngOnInit(): void {
		this.isLightMode$ = this.settingsQuery.isLightMode$;
	}

	themeToggle(): void {
		this.settingsService.toggleLightMode();
	}
}
