import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MovieApiService } from 'src/app/core';
import { ApiResponse } from '../models/api-response.model';
import { MovieSearchStore } from '../store/movie-search.store';

@Injectable({
	providedIn: 'root'
})
export class MovieSearchService extends MovieApiService {
	constructor(http: HttpClient, private movieSearchStore: MovieSearchStore) {
		super(http);
	}

	search(search: string) {
		const queryString = `s=${search}&type=movie`;
		
		this.get<ApiResponse>(queryString).subscribe(response => {
			this.movieSearchStore.reset();

			this.movieSearchStore.update({
				searchTerm: search,
				movies: response.Search,
				totalCount: response.totalResults
			});
		});
	}
}
