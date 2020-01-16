import { Injectable } from '@angular/core';
import { StoreConfig, EntityStore } from '@datorama/akita';

import { MovieLibraryState } from './movie-library.state';
import { Movie } from '../../../contracts/db/movie';

@StoreConfig({
	name: 'movie-library',
	idKey: 'movieId'
})
@Injectable({
	providedIn: 'root'
})
export class MovieLibraryStore extends EntityStore<
	MovieLibraryState,
	Movie
> {
	constructor() {
		super();
	}
}
