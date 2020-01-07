import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OnlineStateService } from '@app/shared';
import {
	MovieListItemModel,
	MovieDetailsModel,
	MovieLibraryService,
	MovieInLibrary
} from '@app/core';

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
	movie: MovieListItemModel | MovieDetailsModel | MovieInLibrary;

	isOnline$: Observable<boolean>;

	constructor(
		private onlineStateService: OnlineStateService,
		private movieLibraryService: MovieLibraryService
	) {}

	ngOnInit(): void {
		this.isOnline$ = this.onlineStateService.isOnline$;
	}

	async onClick(): Promise<void> {
		return this.determineIfTypeIsMovieInLibrary(this.movie) ||
			this.movie.inLibrary
			? await this.movieLibraryService.removeFromLibrary(this.movieId)
			: await this.movieLibraryService.addToLibrary(
					this.movieId,
					this.movie.title,
					this.movie.posterUrl
			  );
	}

	private get movieId(): string {
		if (this.determineIfTypeIsMovieInLibrary(this.movie)) {
			return this.movie.movieId;
		}

		return this.movie.id.toString();
	}

	determineIfTypeIsMovieInLibrary(
		movie: MovieListItemModel | MovieDetailsModel | MovieInLibrary
	): movie is MovieInLibrary {
		return (movie as MovieInLibrary).movieId ? true : false;
	}
}
