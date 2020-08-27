import { Injectable } from '@angular/core';
import {
	CanActivate,
	CanLoad,
	Route,
	UrlSegment,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanLoad {
	constructor(private fireAuth: AngularFireAuth, private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> {
		return this.handleNoAuth();
	}

	canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
		return this.handleNoAuth();
	}

	private handleNoAuth(): Observable<boolean> {
		return this.fireAuth.authState.pipe(
			take(1),
			map(user => !!user),
			tap(loggedIn => {
				if (loggedIn) {
					this.router.navigate(['']);
				}
			})
		);
	}
}
