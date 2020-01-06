import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieListItemModel, MovieDetailsModel, MovieService } from '@app/core';
import { OnlineStateService } from '@app/shared';

export type ButtonColor = 'primary' | 'accent';

@Component({
	selector: 'ml-add-to-library-button',
	templateUrl: './add-to-library-button.component.html',
	styleUrls: ['./add-to-library-button.component.css']
})
export class AddToLibraryButtonComponent implements OnInit {
	@Input()
	color: string;

	@Input()
	movie: MovieListItemModel | MovieDetailsModel;

	isOnline$: Observable<boolean>;

	constructor(
		private movieService: MovieService,
		private onlineStateService: OnlineStateService
	) {}

	ngOnInit(): void {
		this.isOnline$ = this.onlineStateService.isOnline$;
	}

	async onClick(): Promise<void> {
		return this.movie.inLibrary
			? await this.movieService.removeFromLibrary(this.movieId)
			: await this.movieService.addToLibrary(this.movieId);
	}

	private get movieId(): string {
		return this.movie.id.toString();
	}
}
