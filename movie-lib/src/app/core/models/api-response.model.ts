import { MovieModel } from './movie.model';

export interface ApiResponseModel {
    Search: MovieModel[];
    totalResults: number;
    Response: string;
    Error: string;
}