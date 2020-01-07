import { EntityState } from '@datorama/akita';
import { MovieDetailsModel } from '../../models/movie-details.model';

export interface MovieDetailsState extends EntityState<MovieDetailsModel> {}
