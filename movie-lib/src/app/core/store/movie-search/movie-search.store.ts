import { Store, StoreConfig } from '@datorama/akita';

import { MovieSearchState } from '../movie-search/movie-search.state';

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
