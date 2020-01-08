import { Injectable } from '@angular/core';
import { StoreConfig, EntityStore } from '@datorama/akita';

import { MovieLibraryState } from './movie-library.state';
import { MovieInLibrary } from '../../models/movie-in-library';

@StoreConfig({
	name: 'movie-library',
	idKey: 'movieId'
})
@Injectable({
	providedIn: 'root'
})
export class MovieLibraryStore extends EntityStore<
	MovieLibraryState,
	MovieInLibrary
> {
	constructor() {
		super();
	}
}
