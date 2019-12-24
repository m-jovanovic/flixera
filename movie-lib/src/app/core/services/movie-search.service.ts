import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MovieApiService } from 'src/app/core';
import { ApiResponse } from '../models/api-response.model';
import { MovieSearchStore } from '../store/movie-search/movie-search.store';

@Injectable({
	providedIn: 'root'
})
export class MovieSearchService extends MovieApiService {
	constructor(http: HttpClient, private movieSearchStore: MovieSearchStore) {
		super(http);
	}

	search(search: string, page?: number) {
		if (page == undefined) {
			page = 1;
		}

		const queryString = `s=${search}&type=movie&page=${page}`;

		this.get<ApiResponse>(queryString).subscribe(response => {
			const currentMovies = this.movieSearchStore.getValue().movies;
			
			const movies = page == 1 ? response.Search : currentMovies.concat(response.Search);

			this.movieSearchStore.update({
				searchTerm: search,
				movies: movies,
				page: page,
				hasMore: movies.length < response.totalResults
			});
		});
	}
}
