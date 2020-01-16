import { MovieModel } from './movie.model';

export interface ApiResponseModel {
	Search: MovieModel[];
	totalResults: number;
	Response: string;
	Error: string;
}

export const emptyApiResponse: ApiResponseModel = {
	Search: [],
	totalResults: 0,
	Response: 'False',
	Error: ''
};
