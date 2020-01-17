import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SettingsQuery } from '../../store/settings/settings.query';

@Component({
	selector: 'ml-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
	isLightMode$: Observable<boolean>;

	constructor(private settingsQuery: SettingsQuery) {}

	ngOnInit(): void {
		this.isLightMode$ = this.settingsQuery.isLightMode$;
	}
}
