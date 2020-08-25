import { MovieListItemModel } from '../../../contracts/models/move-list-item.model';

export interface MovieSearchState {
	searchTerm: string;
	movies: MovieListItemModel[];
	page: number;
	hasMore: boolean;
}
