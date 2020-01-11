import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../contracts/db/user';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { AuthQuery } from '../../store/auth/auth.query';

@Component({
	selector: 'ml-nav-bar-menu',
	templateUrl: './nav-bar-menu.component.html',
	styleUrls: ['./nav-bar-menu.component.css']
})
export class NavBarMenuComponent implements OnInit {
	user$: Observable<User>;

	constructor(
		private authenticationService: AuthenticationService,
		private authQuery: AuthQuery
	) {}

	ngOnInit(): void {
		this.user$ = this.authQuery.user$;
	}

	async signOut(): Promise<void> {
		await this.authenticationService.signOut();
	}
}
