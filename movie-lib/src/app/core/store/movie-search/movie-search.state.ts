import { MovieDto } from '../../../core';

export interface MovieSearchState {
	searchTerm: string;
	movies: MovieDto[];
    page: number;
    hasMore: boolean
}