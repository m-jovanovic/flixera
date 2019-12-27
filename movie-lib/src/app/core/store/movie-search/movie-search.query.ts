import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { map } from 'rxjs/operators';

import { MovieSearchState } from '../movie-search/movie-search.state';
import { MovieSearchStore } from '../movie-search/movie-search.store';

@Injectable({ providedIn: 'root' })
export class MovieSearchQuery extends Query<MovieSearchState> {
	movies$ = this.select(state => state.movies);
	searchTermExists$ = this.select(state => state.searchTerm.length).pipe(
		map(length => length > 0)
	);

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
