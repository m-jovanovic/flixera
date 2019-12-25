import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	OnDestroy
} from '@angular/core';
import { Observable, from, fromEvent, Subscription } from 'rxjs';

import { MovieDto } from 'src/app/core';
import { SearchService } from 'src/app/core/services/search.service';
import { MovieSearchQuery } from 'src/app/core/store/movie-search/movie-search.query';
import {
	map,
	filter,
	debounceTime,
	distinctUntilChanged
} from 'rxjs/operators';

@Component({
	selector: 'ml-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
	private readonly enterKeyCode = 13;
	private readonly initialPage = 1;
	rowHeight: number = 465;
	numberOfColumns: number;
	movies$: Observable<MovieDto[]>;
	subscription: Subscription;
	@ViewChild('movieSearchInput', {
		static: true
	})
	movieSearchInput: ElementRef;

	constructor(
		private movieApi: SearchService,
		private query: MovieSearchQuery
	) {}

	ngOnInit(): void {
		this.numberOfColumns = 5;

		this.movies$ = this.query.movies$;
		
		// TODO: Add support for clearing search. Hitting enter? 
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

	onResize(event: Event): void {
		const targetElement = <Window>event.target;

		this.numberOfColumns =
			targetElement.innerWidth >= 1700
				? 5
				: targetElement.innerWidth >= 1400
				? 4
				: targetElement.innerWidth >= 1130
				? 3
				: targetElement.innerWidth >= 850
				? 2
				: 1;
	}

	onScroll() {
		if (!this.query.getHasMore()) {
			return;
		}

		this.movieApi.searchMovies(
			this.query.getSearchTerm(),
			this.query.getPage() + 1
		);
	}
}
