import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { OnlineStateService, ConfirmDialogComponent, ConfirmDialogData } from '@app/shared';
import { MovieListItemModel, MovieDetailsModel, MovieLibraryService, Movie } from '@app/core';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';

export type ButtonColor = 'primary' | 'accent';

@Component({
	selector: 'ml-add-to-movie-library-button',
	templateUrl: './add-to-movie-library-button.component.html',
	styleUrls: ['./add-to-movie-library-button.component.css']
})
export class AddToMovieLibraryButtonComponent implements OnInit {
	@Input()
	color: ThemePalette;

	@Input()
	movie: MovieListItemModel | MovieDetailsModel | Movie;

	isOnline$: Observable<boolean>;

	constructor(
		private onlineStateService: OnlineStateService,
		private movieLibraryService: MovieLibraryService,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.isOnline$ = this.onlineStateService.isOnline$;
	}

	async onClick(): Promise<void> {
		const inLibrary = this.determineIfTypeIsMovieInLibrary(this.movie) || this.movie.inLibrary;

		if (inLibrary) {
			this.handleRemove();
		} else {
			await this.handleAdd();
		}
	}

	private async handleAdd() {
		await this.movieLibraryService.addToLibrary(this.movieId, this.movie.title, this.movie.posterURL);
	}

	private handleRemove() {
		const data: ConfirmDialogData = {
			title: 'Remove movie from library?',
			message: 'This action can not be reversed.',
			dismissButtonText: 'CANCEL',
			confirmButtonText: 'OK',
			dismissButtonColor: 'primary',
			confirmButtonColor: 'primary'
		};

		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			maxWidth: '350px',
			width: '350px',
			data
		});

		dialogRef.afterClosed().subscribe(async (dialogResult: boolean) => {
			if (dialogResult) {
				await this.movieLibraryService.removeFromLibrary(this.movieId);
			}
		});
	}

	private get movieId(): string {
		if (this.determineIfTypeIsMovieInLibrary(this.movie)) {
			return this.movie.movieId;
		}

		return this.movie.id.toString();
	}

	determineIfTypeIsMovieInLibrary(movie: MovieListItemModel | MovieDetailsModel | Movie): movie is Movie {
		return (movie as Movie).movieId ? true : false;
	}
}
