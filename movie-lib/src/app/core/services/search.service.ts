import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { first, catchError, map } from 'rxjs/operators';

import { MovieApiService } from './api.service';
import { ApiResponseModel } from '../models/api-response.model';
import { MovieSearchStore } from '../store/movie-search/movie-search.store';
import { initialMovieSearchState } from '../store/movie-search/movie-search.store';
import { MovieModel } from '../models/movie.model';
import { MovieDetailsStore } from '../store/movie-details/movie-details.store';
import { MovieDetailsModel } from '../models/movie-details.model';

@Injectable({
	providedIn: 'root'
})
export class SearchService extends MovieApiService {
	constructor(
		http: HttpClient,
		private movieSearchStore: MovieSearchStore,
		private movieDetailsStore: MovieDetailsStore
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

				this.movieSearchStore.setLoading(false);
			});
	}

	clearMovies(): void {
		this.movieSearchStore.update(initialMovieSearchState);
	}

	getByImdbId(imdbId: string): void {
		const queryString = `i=${imdbId}&type=movie&plot=full`;

		this.movieDetailsStore.setLoading(true);

		this.get<MovieModel>(queryString)
			.pipe(
				first(),
				map(movie => ({
					id: movie.imdbID,
					title: movie.Title,
					plot: movie.Plot,
					year: movie.Year,
					genre: movie.Genre,
					posterUrl: movie.Poster
				} as MovieDetailsModel)),
				catchError(_ => {
					console.error('Error happened while fetching movie from API');

					return of(null);
				})
			)
			.subscribe((movie: MovieDetailsModel) => {
				this.movieDetailsStore.add(movie);

				this.movieDetailsStore.setLoading(false);
			});
	}

	private updateStore(
		response: ApiResponseModel,
		search: string,
		page: number
	): void {
		// TODO: Refactor!!!
		if (
			response.Response == 'False' ||
			(response.Error != undefined && response.Error.length > 0)
		) {
			this.movieSearchStore.update({
				searchTerm: search,
				movies: [],
				page: page,
				hasMore: false
			});

			return;
		}

		const currentMovies = this.movieSearchStore.getValue().movies;

		const newMovies = response.Search.map(movie => ({
			id: movie.imdbID,
			title: movie.Title,
			posterUrl: movie.Poster
		}));

		const movies = page == 1 ? newMovies : currentMovies.concat(newMovies);

		this.movieSearchStore.update({
			searchTerm: search,
			movies: movies,
			page: page,
			hasMore: movies.length < response.totalResults
		});
	}
}
