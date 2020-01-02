import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';

import { MovieDto } from '../../models/movie.model';
import { MovieDetailsState } from './movie-details.state';
import { MovieDetailsStore } from './movie-details.store';

@Injectable({
	providedIn: 'root'
})
export class MovieDetailsQuery extends Query<MovieDetailsState> {
	movie$: Observable<MovieDto> = this.select(state => state.movie);

	constructor(protected store: MovieDetailsStore) {
		super(store);
	}
}
