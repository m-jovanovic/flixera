import { MovieDto } from './movie.model';

export interface ApiResponse {
    Search: MovieDto[];
    totalResults: number;
    Response: boolean;
}