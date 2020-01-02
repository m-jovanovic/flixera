import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SearchService, MovieDetailsQuery, MovieDto } from '@app/core';
import { tap, first } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
	selector: 'ml-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
	isLoading$: Observable<boolean>;
	movie$: Observable<MovieDto>;
	subscription: Subscription;
	imageExpanded: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private searchService: SearchService,
		private movieDetailsQuery: MovieDetailsQuery
	) {}

	ngOnInit(): void {
		this.isLoading$ = this.movieDetailsQuery.selectLoading();

		this.movie$ = this.movieDetailsQuery.movie$;

		this.subscription = this.route.paramMap
			.pipe(
				first(),
				tap((params: ParamMap) =>
					this.searchService.getByImdbId(params.get('id'))
				)
			)
			.subscribe();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	expandImage(): void {
		this.imageExpanded = !this.imageExpanded;
	}
}
