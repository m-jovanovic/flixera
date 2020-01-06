import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MovieListItemModel } from '../../models/move-list-item.model';
import { MovieSearchState } from './movie-search.state';
import { MovieSearchStore } from './movie-search.store';

@Injectable({
	providedIn: 'root'
})
export class MovieSearchQuery extends Query<MovieSearchState> {
	movies$: Observable<MovieListItemModel[]> = this.select(state => state.movies);

	searchTermExists$: Observable<boolean> = this.select(state => state.searchTerm.length).pipe(
		map(length => length > 0)
	);

	constructor(protected store: MovieSearchStore) {
		super(store);
	}

	get searchTerm(): string {
		return this.getValue().searchTerm;
	}

	get page(): number {
		return this.getValue().page;
	}

	get hasMore(): boolean {
		const state = this.getValue();

		return state.movies.length && state.hasMore;
	}

	get anyMovies(): boolean {
		return this.getValue().movies.length > 0;
	}
}
