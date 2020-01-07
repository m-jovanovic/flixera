import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
	MovieLibraryService,
	MovieLibraryQuery,
	MovieInLibrary
} from '@app/core';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

@Component({
	selector: 'ml-movie-library',
	templateUrl: './movie-library.component.html',
	styleUrls: ['./movie-library.component.css']
})
export class MovieLibraryComponent implements OnInit {
	movies$: Observable<MovieInLibrary[]>;
	isSmallScreen$: Observable<BreakpointState>;

	constructor(
		// We have to inject MovieLibraryService for the Firestore connection to be set up.
		private movieLibraryService: MovieLibraryService,
		private movieLibraryQuery: MovieLibraryQuery,
		private breakpointObserver: BreakpointObserver
	) {}

	ngOnInit() {
		this.movies$ = this.movieLibraryQuery.selectAll();

		this.isSmallScreen$ = this.breakpointObserver.observe('(min-width: 700px)');
	}

	navigateToDetails(): void {}

	trackByFunction(_index: any, item: any): any {
		return item.id;
	}
}
