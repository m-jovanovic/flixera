import { Store, StoreConfig } from '@datorama/akita';

import { MovieSearchState } from '../../../core';

export const initialState: MovieSearchState = {
	searchTerm: '',
	movies: [],
	page: 0,
	hasMore: false
};

@StoreConfig({ name: 'auth' })
export class MovieSearchStore extends Store<MovieSearchState> {
	constructor() {
		super(initialState);
    }
}
