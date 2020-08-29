import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from '@app/core/services/auth/authentication.service';

@Component({
	selector: 'ml-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	constructor(private authService: AuthenticationService) {}

	async googleSignIn() {
		await this.authService.googleSignIn();
	}
}
