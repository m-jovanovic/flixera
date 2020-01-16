import { HttpResponse } from '@angular/common/http';

export interface CacheItem {
    value: HttpResponse<any>;
    timestamp: number;
}

export function isExpired(cacheItem: CacheItem, maxAge: number): boolean {
    if (maxAge < 0) {
        return false;
    }

    return Date.now() - cacheItem.timestamp > maxAge;
}