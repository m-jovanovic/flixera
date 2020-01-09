import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { CacheService } from '../services/caching/cache.service';

@Injectable({
	providedIn: 'root'
})
export class MovieApiCacheInterceptor implements HttpInterceptor {
	constructor(private cacheService: CacheService) {}

	intercept(
		request: HttpRequest<any>,
		handler: HttpHandler
	): Observable<HttpEvent<any>> {
		const nowTimestamp = Date.now();

		if (!this.isCacheable(request)) {
			return handler.handle(request);
		}

		const cacheItem = this.cacheService.get(request.urlWithParams);

		if (cacheItem) {
			return of(new HttpResponse(cacheItem.value));
		}

		return handler.handle(request).pipe(
			tap(event => {
				if (event instanceof HttpResponse) {
					this.cacheService.set(request.urlWithParams, {
						value: event,
						timestamp: nowTimestamp
					});
				}
			})
		);
	}

	private isCacheable(request: HttpRequest<any>): boolean {
		return (
			request.method == 'GET' &&
			request.url.startsWith(environment.movieApiPath)
		);
	}
}
