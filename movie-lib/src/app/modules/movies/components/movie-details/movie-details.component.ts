import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'ml-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
	id: string;

	constructor(
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.id = this.route.snapshot.paramMap.get('id');
	}
}
