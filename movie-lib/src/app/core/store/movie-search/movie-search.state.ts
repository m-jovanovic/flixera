import { MovieDto } from '../../models/movie.model';

export interface MovieSearchState {
	searchTerm: string;
	movies: MovieDto[];
    page: number;
    hasMore: boolean
}