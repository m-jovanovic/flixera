import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	OnDestroy
} from '@angular/core';
import { Observable, fromEvent, Subscription } from 'rxjs';
import {
	map,
	filter,
	debounceTime,
	distinctUntilChanged
} from 'rxjs/operators';

import { MediaQueryColCountPair } from '../../../../shared';
import { MovieDto, SearchService, MovieSearchQuery } from '../../../../core';

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

	searchTerm: string;
	movies$: Observable<MovieDto[]>;
	subscription: Subscription;

	@ViewChild('movieSearchInput', {
		static: true
	})
	movieSearchInput: ElementRef;

	constructor(
		private searchService: SearchService,
		private movieSearchQuery: MovieSearchQuery
	) {}

	ngOnInit(): void {
		this.movies$ = this.movieSearchQuery.movies$;

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
				this.searchService.searchMovies(value, this.initialPage);
			});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onClearClick() {
		this.searchService.clearMovies();

		this.searchTerm = '';
	}

	onScroll() {
		if (!this.movieSearchQuery.getHasMore()) {
			// TODO: Add a notification to tell the user there are no more movies.
			return;
		}

		this.searchService.searchMovies(
			this.movieSearchQuery.getSearchTerm(),
			this.movieSearchQuery.getPage() + 1
		);
	}
}
