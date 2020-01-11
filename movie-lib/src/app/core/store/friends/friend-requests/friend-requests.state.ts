import { EntityState } from '@datorama/akita';
import { FriendRequest } from '../../../contracts/db/friend-request';

export interface FriendRequestsState extends EntityState<FriendRequest> {}
