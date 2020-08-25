import { Injectable } from '@angular/core';

import { CacheItem, isExpired } from './cache-item';

@Injectable({
	providedIn: 'root'
})
export class CacheService {
	private readonly sevenDaysInMilliseconds: number = 7 * 24 * 60 * 60 * 1000;

	get(key: string): CacheItem | null {
		const cacheItem = this.safeGetCacheItem(key);

		if (!cacheItem) {
			return null;
		}

		if (isExpired(cacheItem, this.sevenDaysInMilliseconds)) {
			localStorage.removeItem(key);

			this.clearExpiredCacheItems();

			return null;
		}

		return cacheItem;
	}

	set(key: string, cacheItem: CacheItem): void {
		if (key.length === 0 || !cacheItem) {
			return;
		}

		const cacheItemJson = JSON.stringify(cacheItem);

		localStorage.setItem(key, cacheItemJson);
	}

	private safeGetCacheItem(key: string): CacheItem | null {
		if (key.length === 0) {
			return null;
		}

		const cacheItemJson = localStorage.getItem(key);

		if (!cacheItemJson) {
			return null;
		}

		const cacheItem = JSON.parse(cacheItemJson) as CacheItem;

		return cacheItem;
	}

	private clearExpiredCacheItems(): void {
		const keys = Object.keys(localStorage);

		keys.forEach((key) => {
			const cacheItem = this.safeGetCacheItem(key);

			if (!cacheItem) {
				return;
			}

			if (isExpired(cacheItem, this.sevenDaysInMilliseconds)) {
				localStorage.removeItem(key);
			}
		});
	}
}
