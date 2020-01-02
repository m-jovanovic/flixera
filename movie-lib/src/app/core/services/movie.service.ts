import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { first, catchError, map } from 'rxjs/operators';

import { MovieApiService } from './movie-api.service';
import { MovieModel } from '../models/movie.model';
import { MovieDetailsModel } from '../models/movie-details.model';
import { MovieDetailsStore } from '../store/movie-details/movie-details.store';

@Injectable({
	providedIn: 'root'
})
export class MovieService extends MovieApiService {
	constructor(
		protected http: HttpClient,
		private movieDetailsStore: MovieDetailsStore
	) {
		super(http);
	}

	getById(id: string): void {
		const queryString = `i=${id}&type=movie&plot=full`;

		this.movieDetailsStore.setLoading(true);

		this.get<MovieModel>(queryString)
			.pipe(
				first(),
				map(
					movie =>
						({
							id: movie.imdbID,
							title: movie.Title,
							plot: movie.Plot,
							year: movie.Year,
							genre: movie.Genre,
							posterUrl: movie.Poster
						} as MovieDetailsModel)
				),
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
}
