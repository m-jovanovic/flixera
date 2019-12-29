import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MovieDto } from '../../models/movie.model';
import { MovieSearchState } from './movie-search.state';
import { MovieSearchStore } from './movie-search.store';

@Injectable({
	providedIn: 'root'
})
export class MovieSearchQuery extends Query<MovieSearchState> {
	movies$: Observable<MovieDto[]> = this.select(state => state.movies);

	searchTermExists$: Observable<boolean> = this.select(state => state.searchTerm.length).pipe(
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
