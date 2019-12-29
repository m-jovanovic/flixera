import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	OnDestroy
} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, fromEvent, Subscription } from 'rxjs';
import {
	map,
	filter,
	debounceTime,
	distinctUntilChanged
} from 'rxjs/operators';

import { MediaQueryColCountPair } from '@app/shared';
import { MovieDto, SearchService, MovieSearchQuery } from '@app/core';

@Component({
	selector: 'ml-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
	enterKeyCode = 13;
	initialPage = 1;
	rowHeight: number = 550;
	mediaQueryColCountPairs: MediaQueryColCountPair[] = [
		{ mediaQuery: '(max-width: 949px)', colCount: 1 },
		{ mediaQuery: '(min-width: 950px)', colCount: 2 },
		{ mediaQuery: '(min-width: 1270px)', colCount: 3 },
		{ mediaQuery: '(min-width: 1600px)', colCount: 4 },
		{ mediaQuery: '(min-width: 1920px)', colCount: 5 }
	];

	movies$: Observable<MovieDto[]>;
	searchTermExists$: Observable<boolean>;
	subscription: Subscription;

	@ViewChild('movieSearchInput', {
		static: true
	})
	movieSearchInput: ElementRef;

	constructor(
		private searchService: SearchService,
		private movieSearchQuery: MovieSearchQuery,
		private snackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		this.movies$ = this.movieSearchQuery.movies$;

		this.searchTermExists$ = this.movieSearchQuery.searchTermExists$;

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

		(<HTMLInputElement>this.movieSearchInput.nativeElement).value = '';
	}

	onScroll() {
		if (!this.movieSearchQuery.getHasMore()) {
			this.snackBar.open('There are no more movies to show.', '', {
				duration: 3000
			});

			return;
		}

		this.searchService.searchMovies(
			this.movieSearchQuery.getSearchTerm(),
			this.movieSearchQuery.getPage() + 1
		);
	}
}
