import { Injectable } from '@angular/core';
import { Observable, Observer, merge, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class OnlineStateService {
	isOnline$: Observable<boolean>;

	constructor() {
		this.isOnline$ = merge<boolean>(
			new Observable((observer: Observer<boolean>) => {
				observer.next(navigator.onLine);

				observer.complete();
			}),
			fromEvent(window, 'offline').pipe(map(() => false)),
			fromEvent(window, 'online').pipe(map(() => true))
		);
	}
}
