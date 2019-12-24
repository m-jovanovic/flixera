import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MovieApiService } from './api.service';
import { ApiResponse } from '../models/api-response.model';
import { MovieSearchStore } from '../store/movie-search/movie-search.store';

@Injectable({
	providedIn: 'root'
})
export class SearchService extends MovieApiService {
	constructor(http: HttpClient, private store: MovieSearchStore) {
		super(http);
	}

	searchMovies(search: string, page?: number) {
		if (page == undefined) {
			page = 1;
		}

		const queryString = `s=${search}&type=movie&page=${page}`;

		this.store.setLoading(true);

		this.get<ApiResponse>(queryString).subscribe(response =>
			this.updateStore(response, search, page)
		);
	}

	private updateStore(response: ApiResponse, search: string, page: number) {
		const currentMovies = this.store.getValue().movies;

		const movies =
			page == 1 ? response.Search : currentMovies.concat(response.Search);

		this.store.update({
			searchTerm: search,
			movies: movies,
			page: page,
			hasMore: movies.length < response.totalResults
		});

		this.store.setLoading(false);
	}
}
