import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieDto } from 'src/app/core';
import { SearchService } from 'src/app/core/services/search.service';
import { MovieSearchQuery } from 'src/app/core/store/movie-search/movie-search.query';

@Component({
	selector: 'ml-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
	private readonly enterKeyCode = 13;
	rowHeight: number = 465;
	numberOfColumns: number;
	movies$: Observable<MovieDto[]>;

	constructor(
		private movieApi: SearchService,
		private query: MovieSearchQuery
	) {}

	ngOnInit(): void {
		this.numberOfColumns = 5;
		this.movies$ = this.query.movies$;
	}

	onKeyDown(event: KeyboardEvent): void {
		if (event.keyCode == this.enterKeyCode) {
			const inputElement = <HTMLInputElement>event.srcElement;

			this.movieApi.searchMovies(inputElement.value, 1);
		}
	}

	onResize(event: Event): void {
		const targetElement = <Window>event.srcElement;

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
