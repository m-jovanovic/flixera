import { Injectable } from '@angular/core';

import { CacheItem } from '../models/cache-item';

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    maxAge: number = 7 * 24 * 60 * 60 * 1000;

    get(key: string): CacheItem | null{
        if (key.length == 0) {
            return null;
        }

        const cacheItemJson = localStorage.getItem(key);

        if (!cacheItemJson) {
            return null;
        }

        const cacheItem = (<CacheItem>JSON.parse(cacheItemJson));
        
        if (Date.now() - cacheItem.timestamp > this.maxAge) {
            return null;
        }
        
        return cacheItem;
    }

    set(key: string, cacheItem: CacheItem): void {
        if (key.length == 0 || !cacheItem) {
            return;
        }

        const cacheItemJson = JSON.stringify(cacheItem);
        
        localStorage.setItem(key, cacheItemJson);
    }
}