import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import {
	OnlineStateService,
	ConfirmDialogComponent,
	ConfirmDialogData
} from '@app/shared';
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
		private movieLibraryService: MovieLibraryService,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.isOnline$ = this.onlineStateService.isOnline$;
	}

	async onClick(): Promise<void> {
		const inLibrary =
			this.determineIfTypeIsMovieInLibrary(this.movie) || this.movie.inLibrary;

		if (inLibrary) {
			this.handleRemove();
		} else {
			await this.handleAdd();
		}
	}

	private async handleAdd() {
		await this.movieLibraryService.addToLibrary(this.movieId, this.movie.title, this.movie.posterUrl);
	}

	private handleRemove() {
		const data: ConfirmDialogData = {
			title: 'Remove movie from library?',
			message: 'This action can not be reversed.',
			dismissButtonText: 'CANCEL',
			confirmButtonText: 'OK',
			dismissButtonColor: 'primary',
			confirmButtonColor: 'primary',
		};
		
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			maxWidth: '350px',
			width: '350px',
			data: data
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

	determineIfTypeIsMovieInLibrary(
		movie: MovieListItemModel | MovieDetailsModel | MovieInLibrary
	): movie is MovieInLibrary {
		return (movie as MovieInLibrary).movieId ? true : false;
	}
}
