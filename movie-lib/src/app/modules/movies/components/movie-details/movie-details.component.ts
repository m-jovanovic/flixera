import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { MovieService, MovieDetailsQuery, MovieDetailsModel } from '@app/core';

@Component({
	selector: 'ml-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
	movie$: Observable<MovieDetailsModel> = this.movieDetailsQuery.selectEntity(
		this.movieId
	);
	isLoading$: Observable<boolean>;
	imageExpanded: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private movieService: MovieService,
		private movieDetailsQuery: MovieDetailsQuery
	) {}

	ngOnInit(): void {
		this.isLoading$ = this.movieDetailsQuery.selectLoading();

		if (!this.movieDetailsQuery.hasEntity(this.movieId)) {
			this.movieService.getById(this.movieId);
		}
	}

	expandImage(): void {
		this.imageExpanded = !this.imageExpanded;
	}

	private get movieId(): string {
		return this.route.snapshot.paramMap.get('id');
	}
}
