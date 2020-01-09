import { EntityState } from '@datorama/akita';
import { MovieDetailsModel } from '../../../contracts/models/movie-details.model';

export interface MovieDetailsState extends EntityState<MovieDetailsModel> {}
