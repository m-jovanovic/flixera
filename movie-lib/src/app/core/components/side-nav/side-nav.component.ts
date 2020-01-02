import { Component } from '@angular/core';
import {
	BreakpointObserver,
	Breakpoints,
	BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
	selector: 'ml-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
	isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([
		Breakpoints.XSmall,
		Breakpoints.Small
	]);

	constructor(private breakpointObserver: BreakpointObserver) {}
}
