import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MovieListItemModel } from '@app/core';

@Component({
	selector: 'ml-movie-search-item',
	templateUrl: './movie-search-item.component.html',
	styleUrls: ['./movie-search-item.component.css']
})
export class MovieSearchItemComponent {
	@Input() movie: MovieListItemModel;

	constructor(private router: Router) {}

	navigateToDetails(id: string): void {
		this.router.navigate(['/movies', id]);
	}
}
