import { EntityState } from '@datorama/akita';
import { MovieInLibrary } from '@app/core/models/movie-in-library';

export interface MovieLibraryState extends EntityState<MovieInLibrary> {}
