import { StoreConfig, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { MovieDetailsState } from './movie-details.state';
import { MovieDetailsModel } from '@app/core/models/movie-details.model';

@StoreConfig({ name: 'movie-details' })
@Injectable({
	providedIn: 'root'
})
export class MovieDetailsStore extends EntityStore<MovieDetailsState, MovieDetailsModel> {
	constructor() {
		super();
	}
}
