import { Component, OnInit } from '@angular/core';
import { BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { HandsetStateService } from '@app/shared';

@Component({
	selector: 'ml-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
	isHandset$: Observable<BreakpointState>;

	constructor(private handsetStateService: HandsetStateService) {}

	ngOnInit(): void {
		this.isHandset$ = this.handsetStateService.isHandset$;
	}
}
