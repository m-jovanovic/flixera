import { EntityState } from '@datorama/akita';
import { FriendMovie } from '../../../contracts/db/friend-movie';

export interface FriendLibraryState extends EntityState<FriendMovie> {}
