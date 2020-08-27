import { EntityState } from '@datorama/akita';

import { SearchUser } from '../../../contracts/db/search-user';

export interface FriendSearchState extends EntityState<SearchUser> {}
