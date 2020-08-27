import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { map, filter, debounceTime } from 'rxjs/operators';

import { MediaQueryColCountPair } from '@app/shared';
import { MovieListItemModel, MovieSearchService, MovieSearchQuery } from '@app/core';

@Component({
	selector: 'ml-movie-search',
	templateUrl: './movie-search.component.html',
	styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit, OnDestroy {
	private readonly initialPage = 1;
	private subscription: Subscription;
	rowHeight = 550;
	mediaQueryColCountPairs: MediaQueryColCountPair[] = [
		{ mediaQuery: '(max-width: 949px)', colCount: 1 },
		{ mediaQuery: '(min-width: 950px)', colCount: 2 },
		{ mediaQuery: '(min-width: 1270px)', colCount: 3 },
		{ mediaQuery: '(min-width: 1600px)', colCount: 4 },
		{ mediaQuery: '(min-width: 1920px)', colCount: 5 }
	];
	isLoading$: Observable<boolean>;
	movies$: Observable<MovieListItemModel[]>;
	searchTermExists$: Observable<boolean>;

	@ViewChild('movieSearchInput', {
		static: true
	})
	movieSearchInput: ElementRef;

	constructor(private searchService: MovieSearchService, private movieSearchQuery: MovieSearchQuery, private snackBar: MatSnackBar) {}

	ngOnInit(): void {
		this.isLoading$ = this.movieSearchQuery.selectLoading();

		this.movies$ = this.movieSearchQuery.movies$;

		this.searchTermExists$ = this.movieSearchQuery.searchTermExists$;

		this.subscribeToSearchInputKeyUp();

		this.setSearchInputValue(this.movieSearchQuery.searchTerm);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onEnterKeyUp(): void {
		this.movieSearchInput.nativeElement.blur();
	}

	onClearClick(): void {
		this.searchService.clearMovies();

		this.setSearchInputValue();
	}

	onScroll() {
		if (!this.movieSearchQuery.hasMore && this.movieSearchQuery.anyMovies) {
			this.snackBar.open('There are no more movies to show.', '', {
				duration: 3000
			});

			return;
		}

		this.searchService.searchMovies(this.movieSearchQuery.searchTerm, this.movieSearchQuery.page + 1);
	}

	private subscribeToSearchInputKeyUp(): void {
		this.subscription = fromEvent(this.movieSearchInput.nativeElement, 'keyup')
			.pipe(
				map((event: KeyboardEvent) => {
					return (event.target as HTMLInputElement).value;
				}),
				filter((value) => value.length > 1),
				debounceTime(400)
			)
			.subscribe(async (searchTerm) => {
				await this.searchService.searchMovies(searchTerm, this.initialPage);
			});
	}

	private setSearchInputValue(value: string = ''): void {
		this.movieSearchInput.nativeElement.value = value;
	}
}
