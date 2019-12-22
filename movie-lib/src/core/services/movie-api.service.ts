import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { MovieDto } from "src/core";
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: "root"
})
export class MovieApiService {
  constructor(private http: HttpClient) {}

  apiPath: string = `http://www.omdbapi.com/?apikey=${environment.movieApiKey}`;

  search(search: string): Observable<MovieDto[]> {
    const url = `${this.apiPath}&s=${search}&type=movie`;

    return this.http.get<ApiResponse>(url)
      .pipe(
        map(response => response.Search)
      );
  }

  getByImdbId(id: string): Observable<MovieDto> {
    const url = `${this.apiPath}&i=${id}&type=movie&plot=full`;
    
    return this.http.get<MovieDto>(url);
  }
}
