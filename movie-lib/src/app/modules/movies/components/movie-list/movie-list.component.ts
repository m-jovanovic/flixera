import { Component, OnInit, HostListener } from '@angular/core';
import { MovieDto } from 'src/app/core';
import { SearchService } from 'src/app/core/services/search.service';
import { MovieSearchQuery } from 'src/app/core/store/movie-search/movie-search.query';
import { Observable } from 'rxjs';

@Component({
	selector: 'ml-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
	movies: Observable<MovieDto[]>;
	cols: number;

	constructor(
		private movieApi: SearchService,
		private query: MovieSearchQuery
	) {}

	ngOnInit() {
		this.cols = 5;
		this.movies = this.query.movies$;
	}

	onKeyDown(event) {
		if (event.keyCode == 13) {
			console.log(`Searching for: ${event.target.value}`);

			this.movieApi.searchMovies(event.target.value, 1);
		}
	}

	onResize(event) {
		this.cols =
			event.target.innerWidth >= 1700
				? 5
				: event.target.innerWidth >= 1400
				? 4
				: event.target.innerWidth >= 1130
				? 3
				: event.target.innerWidth >= 850
				? 2
				: 1;
  }
  
	onScroll() {
		if (!this.query.getHasMore()) {
			return;
		}

		this.movieApi.searchMovies(this.query.getSearchTerm(), this.query.getPage() + 1);
	}
}
