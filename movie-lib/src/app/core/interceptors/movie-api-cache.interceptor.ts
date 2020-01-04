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
import { CacheItem } from '../models/cache-item';
import { CacheService } from '../services/cache.service';

@Injectable({
	providedIn: 'root'
})
export class MovieApiCacheInterceptor implements HttpInterceptor {
	constructor(private cache: CacheService) {}

	intercept(
		request: HttpRequest<any>,
		handler: HttpHandler
	): Observable<HttpEvent<any>> {
		const now = Date.now();

		if (!this.isCacheable(request)) {
			return handler.handle(request);
		}

		const cacheItem = this.cache.get(request.urlWithParams);

		if (cacheItem) {
			return of(new HttpResponse(cacheItem.value));
		}

		return handler.handle(request).pipe(
			tap(event => {
				if (event instanceof HttpResponse) {
					this.cache.set(request.urlWithParams, {
						value: event,
						timestamp: now
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
