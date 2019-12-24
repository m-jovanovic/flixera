import { MovieDto } from '../..';

export interface MovieSearchState {
	searchTerm: string;
	movies: MovieDto[];
    page: number;
    hasMore: boolean
}