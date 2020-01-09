import { EntityState } from '@datorama/akita';
import { MovieInLibrary } from '@app/core/contracts/db/movie-in-library';

export interface MovieLibraryState extends EntityState<MovieInLibrary> {}
