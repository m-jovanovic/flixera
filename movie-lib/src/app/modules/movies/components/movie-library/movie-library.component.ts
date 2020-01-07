import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
	MovieLibraryService,
	MovieLibraryQuery,
	MovieInLibrary
} from '@app/core';

@Component({
	selector: 'ml-movie-library',
	templateUrl: './movie-library.component.html',
	styleUrls: ['./movie-library.component.css']
})
export class MovieLibraryComponent implements OnInit {
	movies$: Observable<MovieInLibrary[]>;

	constructor(
		// We have to inject MovieLibraryService for the Firestore connection to be set up.
		private movieLibraryService: MovieLibraryService,
		private movieLibraryQuery: MovieLibraryQuery
	) {}

	ngOnInit() {
		this.movies$ = this.movieLibraryQuery.selectAll();
	}

	navigateToDetails(): void {}

	trackByFunction(_index: any, item: any): any {
		return item.id;
	}
}
