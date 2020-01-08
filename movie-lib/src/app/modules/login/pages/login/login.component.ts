import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/auth/authentication.service';
import { Observable } from 'rxjs';

import { User } from '@app/core/models/user';
import { AuthQuery } from '@app/core/store/auth/auth.query';

@Component({
	selector: 'ml-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user$: Observable<User>;
	loggedIn$: Observable<boolean>;

	constructor(
		private authService: AuthenticationService,
		private authQuery: AuthQuery
	) {}

	ngOnInit() {
		this.user$ = this.authQuery.user$;

		this.loggedIn$ = this.authQuery.loggedIn$;
	}

	async googleSignIn() {
		await this.authService.googleSignIn();
	}

	async signOut() {
		await this.authService.signOut();
	}
}
