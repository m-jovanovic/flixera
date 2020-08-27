import { Movie } from './movie';

export interface FriendMovie extends Movie {
	liked: boolean;
}
