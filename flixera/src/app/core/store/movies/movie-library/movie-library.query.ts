import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { MovieLibraryState } from './movie-library.state';
import { Movie } from '../../../contracts/db/movie';
import { MovieLibraryStore } from './movie-library.store';

@Injectable({
	providedIn: 'root'
})
export class MovieLibraryQuery extends QueryEntity<MovieLibraryState, Movie> {
	constructor(protected store: MovieLibraryStore) {
		super(store);
	}
}
