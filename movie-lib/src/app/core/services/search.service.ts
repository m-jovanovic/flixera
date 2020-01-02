import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { first, catchError } from 'rxjs/operators';

import { MovieApiService } from './movie-api.service';
import { ApiResponseModel, emptyApiResponse } from '../models/api-response.model';
import { MovieSearchStore } from '../store/movie-search/movie-search.store';
import { initialMovieSearchState } from '../store/movie-search/movie-search.store';
import { MovieListItemModel } from '../models/move-list-item.model';

@Injectable({
	providedIn: 'root'
})
export class SearchService extends MovieApiService {
	constructor(
		protected http: HttpClient,
		private movieSearchStore: MovieSearchStore
	) {
		super(http);
	}

	searchMovies(search: string, page?: number): void {
		if (page == undefined) {
			page = 1;
		}

		const queryString = `s=${search}&type=movie&page=${page}`;

		this.movieSearchStore.setLoading(true);

		this.get<ApiResponseModel>(queryString)
			.pipe(
				first(),
				catchError(_ => {
					console.error('Error happened while fetching movies from API.');

					return of(emptyApiResponse);
				})
			)
			.subscribe(response => {
				this.updateStore(response, search, page);

				this.movieSearchStore.setLoading(false);
			});
	}

	clearMovies(): void {
		this.movieSearchStore.update(initialMovieSearchState);
	}

	private updateStore(
		response: ApiResponseModel,
		search: string,
		page: number
	): void {
		if (this.setEmptyStateIfBadResponse(response, search, page)) {
			return;
		}

		const movies = this.getMovies(response, page);

		this.movieSearchStore.update({
			searchTerm: search,
			movies: movies,
			page: page,
			hasMore: movies.length < response.totalResults
		});
	}

	private setEmptyStateIfBadResponse(
		response: ApiResponseModel,
		search: string,
		page: number
	): boolean {
		if (response.Response == 'True' && response.Error == undefined) {
			return false;
		}

		this.movieSearchStore.update({
			searchTerm: search,
			movies: [],
			page: page,
			hasMore: false
		});

		return true;
	}

	private getMovies(
		response: ApiResponseModel,
		page: number
	): MovieListItemModel[] {
		const currentMovies = this.movieSearchStore.getValue().movies;

		const newMovies = response.Search.map(movie => ({
			id: movie.imdbID,
			title: movie.Title,
			posterUrl: movie.Poster
		}));

		const movies = page == 1 ? newMovies : currentMovies.concat(newMovies);

		return movies;
	}
}
