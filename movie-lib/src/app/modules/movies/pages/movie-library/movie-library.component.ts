import { Component, OnInit } from '@angular/core';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import {
	MovieLibraryService,
	MovieLibraryQuery,
	Movie
} from '@app/core';

@Component({
	selector: 'ml-movie-library',
	templateUrl: './movie-library.component.html',
	styleUrls: ['./movie-library.component.css']
})
export class MovieLibraryComponent implements OnInit {
	movies$: Observable<Movie[]>;
	isSmallScreen$: Observable<BreakpointState>;

	constructor(
		// We have to inject MovieLibraryService for the Firestore connection to be set up.
		private movieLibraryService: MovieLibraryService,
		private movieLibraryQuery: MovieLibraryQuery,
		private breakpointObserver: BreakpointObserver
	) {}

	ngOnInit(): void {
		this.movies$ = this.movieLibraryQuery.selectAll();

		this.isSmallScreen$ = this.breakpointObserver.observe('(min-width: 700px)');
	}

	trackByFunction(_index: any, item: any): any {
		return item.id;
	}
}
