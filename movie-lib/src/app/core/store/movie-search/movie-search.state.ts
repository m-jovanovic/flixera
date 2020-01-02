import { MovieListItemModel } from '../../models/move-list-item.model';

export interface MovieSearchState {
	searchTerm: string;
	movies: MovieListItemModel[];
    page: number;
    hasMore: boolean
}