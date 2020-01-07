import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { MovieLibraryState } from './movie-library.state';
import { MovieInLibrary } from '../../models/movie-in-library';
import { MovieLibraryStore } from './movie-library.store';

@Injectable({
	providedIn: 'root'
})
export class MovieLibraryQuery extends QueryEntity<MovieLibraryState, MovieInLibrary> {
	constructor(protected store: MovieLibraryStore) {
		super(store);
	}
}