import { ID } from '@datorama/akita';

export interface MovieInLibrary {
	id: ID;
	userId: string;
	movieId: string;
	title: string;
	posterUrl: string;
	likes: number;
}
