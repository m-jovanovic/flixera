import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { MovieDetailsState } from './movie-details.state';

export const initialMovieDetailsState: MovieDetailsState = {
	movie: null
};

@StoreConfig({ name: 'movie-details' })
@Injectable({
	providedIn: 'root'
})
export class MovieDetailsStore extends Store<MovieDetailsState> {
	constructor() {
		super(initialMovieDetailsState);
    }
}
