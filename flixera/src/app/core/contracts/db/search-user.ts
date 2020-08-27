import { User } from './user';

export interface SearchUser extends User {
	isFriend: boolean;
}
