import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { MovieSearchState } from './movie-search.state';

export const initialState: MovieSearchState = {
	searchTerm: '',
	movies: [],
	page: 0,
	hasMore: false
};

@StoreConfig({ name: 'movie-search' })
@Injectable({
	providedIn: 'root'
})
export class MovieSearchStore extends Store<MovieSearchState> {
	constructor() {
		super(initialState);
    }
}
