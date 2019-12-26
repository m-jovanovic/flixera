import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MovieDto } from '../../../../core';

@Component({
	selector: 'ml-movie-item',
	templateUrl: './movie-item.component.html',
	styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
	@Input() movie: MovieDto;

	constructor(private router: Router) {}

	ngOnInit() {}

	onClick(imdbId: string) {
		this.router.navigate(['/movies', imdbId]);
	}
}
