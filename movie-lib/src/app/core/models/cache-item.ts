import { HttpResponse } from '@angular/common/http';

export interface CacheItem {
    value: HttpResponse<any>;
    timestamp: number;
}