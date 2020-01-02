import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService, MovieDetailsQuery, MovieDetailsModel } from '@app/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'ml-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
	isLoading$: Observable<boolean>;
	movie$: Observable<MovieDetailsModel>;
	imageExpanded: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private searchService: SearchService,
		private movieDetailsQuery: MovieDetailsQuery
	) {
		this.movie$ = this.movieDetailsQuery.selectEntity(this.movieId);
	}

	ngOnInit(): void {
		this.isLoading$ = this.movieDetailsQuery.selectLoading();

		if (!this.movieDetailsQuery.hasEntity(this.movieId)) {
			this.searchService.getByImdbId(this.movieId);
		}
	}

	expandImage(): void {
		this.imageExpanded = !this.imageExpanded;
	}

	get movieId(): string {
		return this.route.snapshot.params.id;
	}
}
