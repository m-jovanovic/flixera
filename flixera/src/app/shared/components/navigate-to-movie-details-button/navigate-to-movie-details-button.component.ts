import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'ml-navigate-to-movie-details-button',
	templateUrl: './navigate-to-movie-details-button.component.html',
	styleUrls: ['./navigate-to-movie-details-button.component.css']
})
export class NavigateToDetailsButtonComponent {
	@Input()
	id: string;

	constructor(private router: Router) {}

	async navigateToDetails(): Promise<boolean> {
		return await this.router.navigate(['/movies', this.id]);
	}
}
