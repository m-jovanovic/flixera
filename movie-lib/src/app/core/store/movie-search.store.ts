import { Store, StoreConfig } from '@datorama/akita';
import { MovieDto } from '../models/movie.model';

export interface MovieSearchState {
	searchTerm: string;
	movies: MovieDto[];
	totalCount: number;
}

export const initialState: MovieSearchState = {
	searchTerm: '',
	movies: null,
	totalCount: 0
};

@StoreConfig({ name: 'auth' })
export class MovieSearchStore extends Store<MovieSearchState> {
	constructor() {
		super(initialState);
    }
}
