import { MovieDetailsModel } from '../../models/movie-details.model';
import { EntityState } from '@datorama/akita';

export interface MovieDetailsState extends EntityState<MovieDetailsModel> {}
