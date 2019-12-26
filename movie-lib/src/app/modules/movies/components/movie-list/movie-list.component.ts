import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	OnDestroy
} from '@angular/core';
import { Observable, fromEvent, Subscription } from 'rxjs';

import { MovieDto } from 'src/app/core';
import { SearchService } from 'src/app/core/services/search.service';
import { MovieSearchQuery } from 'src/app/core/store/movie-search/movie-search.query';
import {
	map,
	filter,
	debounceTime,
	distinctUntilChanged
} from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MediaQueryColCountPair } from 'src/app/shared/directives/responsive-columns/media-query-col-count-pair';

@Component({
	selector: 'ml-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
	private readonly enterKeyCode = 13;
	private readonly initialPage = 1;
	private readonly rowHeight: number = 550;
	private readonly mediaQueryColCountPairs: MediaQueryColCountPair[] = [
		{ mediaQuery: '(max-width: 949px)', colCount: 1 },
		{ mediaQuery: '(min-width: 950px)', colCount: 2 },
		{ mediaQuery: '(min-width: 1270px)', colCount: 3 },
		{ mediaQuery: '(min-width: 1600px)', colCount: 4 },
		{ mediaQuery: '(min-width: 1920px)', colCount: 5 }
	];

	movies$: Observable<MovieDto[]>;
	subscription: Subscription;

	@ViewChild('movieSearchInput', {
		static: true
	})
	movieSearchInput: ElementRef;

	constructor(
		private movieApi: SearchService,
		private movieSearchQuery: MovieSearchQuery
	) {}

	ngOnInit(): void {
		this.movies$ = this.movieSearchQuery.movies$;

		// TODO: Add support for clearing search & movies.
		this.subscription = fromEvent(this.movieSearchInput.nativeElement, 'keyup')
			.pipe(
				map((event: KeyboardEvent) => {
					return (<HTMLInputElement>event.target).value;
				}),
				filter(value => value.length > 2),
				debounceTime(400),
				distinctUntilChanged()
			)
			.subscribe(value => {
				this.movieApi.searchMovies(value, this.initialPage);
			});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onScroll() {
		if (!this.movieSearchQuery.getHasMore()) {
			// TODO: Add a notification to tell the user there are no more movies.
			return;
		}

		this.movieApi.searchMovies(
			this.movieSearchQuery.getSearchTerm(),
			this.movieSearchQuery.getPage() + 1
		);
	}
}
