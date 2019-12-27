import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { first, catchError } from 'rxjs/operators';

import { MovieApiService } from './api.service';
import { ApiResponse } from '../models/api-response.model';
import { MovieSearchStore } from '../store/movie-search/movie-search.store';
import { initialState } from '../store/movie-search/movie-search.store';

@Injectable({
	providedIn: 'root'
})
export class SearchService extends MovieApiService {
	constructor(http: HttpClient, private store: MovieSearchStore) {
		super(http);
	}

	searchMovies(search: string, page?: number): void {
		if (page == undefined) {
			page = 1;
		}

		const queryString = `s=${search}&type=movie&page=${page}`;

		this.store.setLoading(true);

		this.get<ApiResponse>(queryString)
			.pipe(
				first(),
				catchError(_ => {
					console.error('Error happened while fetching movies from API');

					return of({
						Search: [],
						totalResults: 0,
						Response: 'False',
						Error: ''
					});
				})
			)
			.subscribe(response => {
				this.updateStore(response, search, page);

				this.store.setLoading(false);
			});
	}

	clearMovies(): void {
		this.store.update(initialState);
	}

	private updateStore(
		response: ApiResponse,
		search: string,
		page: number
	): void {
		if (
			response.Response == 'False' ||
			(response.Error != undefined && response.Error.length > 0)
		) {
			this.store.update({
				searchTerm: search,
				movies: [],
				page: page,
				hasMore: false
			});

			return;
		}

		const currentMovies = this.store.getValue().movies;

		const movies =
			page == 1 ? response.Search : currentMovies.concat(response.Search);

		this.store.update({
			searchTerm: search,
			movies: movies,
			page: page,
			hasMore: movies.length < response.totalResults
		});
	}
}
