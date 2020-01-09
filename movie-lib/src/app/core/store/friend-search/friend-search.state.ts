import { EntityState } from '@datorama/akita';

import { User } from '../../contracts/db/user';

export interface FriendSearchState extends EntityState<User> {}
