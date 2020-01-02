import { ID } from '@datorama/akita';

export interface MovieDetailsModel {
    id: ID;
    title: string;
    plot: string;
    year: string;
    genre: string;
    posterUrl: string;
}