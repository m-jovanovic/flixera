import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'ml-navigate-to-details-button',
	templateUrl: './navigate-to-details-button.component.html',
	styleUrls: ['./navigate-to-details-button.component.css']
})
export class NavigateToDetailsButtonComponent {
	@Input()
	id: string;

	constructor(private router: Router) {}

	async navigateToDetails(): Promise<boolean> {
		return await this.router.navigate(['/movies', this.id]);
	}
}
