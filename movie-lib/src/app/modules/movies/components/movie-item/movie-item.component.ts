import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MovieDto } from '@app/core';

@Component({
	selector: 'ml-movie-item',
	templateUrl: './movie-item.component.html',
	styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent{
	@Input() movie: MovieDto;

	constructor(private router: Router) {}
	
	onClick(imdbId: string): void {
		this.router.navigate(['/movies', imdbId]);
	}
}
