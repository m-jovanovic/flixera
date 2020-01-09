import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/auth/authentication.service';
import { AuthQuery } from '@app/core/store/auth/auth.query';
import { Observable } from 'rxjs';
import { User } from '@app/core/contracts/db/user';

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

	ngOnInit() {
		this.user$ = this.authQuery.user$;
	}

	async signOut() {
		await this.authenticationService.signOut();
	}
}
