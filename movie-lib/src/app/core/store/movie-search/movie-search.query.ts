import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MovieSearchStore } from './movie-search.store';
import { MovieSearchState } from './movie-search.state';

@Injectable({ providedIn: 'root' })
export class MovieSearchQuery extends Query<MovieSearchState> {
	movies$ = this.select(state => state.movies);

	constructor(protected store: MovieSearchStore) {
		super(store);
	}

	getSearchTerm(): string {
		return this.getValue().searchTerm;
	}

	getPage(): number {
		return this.getValue().page;
	}

	getHasMore(): boolean {
		return this.getValue().hasMore;
	}
}
