import { EntityState } from '@datorama/akita';
import { Friend } from '../../../contracts/db/friend';

export interface FriendState extends EntityState<Friend> {}
