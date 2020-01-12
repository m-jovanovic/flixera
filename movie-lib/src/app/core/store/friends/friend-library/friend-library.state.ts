import { EntityState } from '@datorama/akita';
import { Movie } from '../../../contracts/db/movie';

export interface FriendLibraryState extends EntityState<Movie> {}
