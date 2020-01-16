import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { MovieDetailsModel } from '../../../contracts/models/movie-details.model';
import { MovieDetailsState } from './movie-details.state';
import { MovieDetailsStore } from './movie-details.store';

@Injectable({
	providedIn: 'root'
})
export class MovieDetailsQuery extends QueryEntity<MovieDetailsState, MovieDetailsModel> {
	constructor(protected store: MovieDetailsStore) {
		super(store);
	}
}
