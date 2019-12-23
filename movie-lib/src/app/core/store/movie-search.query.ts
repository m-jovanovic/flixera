import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MovieSearchState, MovieSearchStore } from './movie-search.store';

@Injectable({ providedIn: 'root' })
export class MovieSearchQuery extends Query<MovieSearchState> {
	movies$ = this.select(state => state.movies);

	hasMoreMovies$ = this.select(state => state.totalCount > state.movies.length);

	constructor(protected store: MovieSearchStore) {
		super(store);
	}
}
