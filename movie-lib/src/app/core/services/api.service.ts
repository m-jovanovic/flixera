import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MovieApiService {
	private apiPath: string = `${environment.movieApiPath}/?apikey=${environment.movieApiKey}`;
	
	protected constructor(private http: HttpClient) {}

	protected get<T>(queryString: string): Observable<T> {
		return this.http.get<T>(`${this.apiPath}&${queryString}`);
	}
}
