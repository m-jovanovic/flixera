import { EntityState } from '@datorama/akita';
import { User } from '../../models/user';

export interface FriendSearchState extends EntityState<User> {}
