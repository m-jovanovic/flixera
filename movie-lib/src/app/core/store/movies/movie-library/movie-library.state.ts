import { EntityState } from '@datorama/akita';
import { Movie } from '@app/core/contracts/db/movie';

export interface MovieLibraryState extends EntityState<Movie> {}
