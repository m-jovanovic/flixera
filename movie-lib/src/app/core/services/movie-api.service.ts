import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MovieApiService {
	protected constructor(private http: HttpClient) {}

	private apiPath: string = `http://www.omdbapi.com/?apikey=${environment.movieApiKey}`;

	protected get<T>(queryString: string): Observable<T> {
		return this.http.get<T>(`${this.apiPath}&${queryString}`);
	}
}
