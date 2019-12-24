import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatInputModule,
	MatGridListModule,
	MatCardModule,
	MatButtonModule
} from '@angular/material';

import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { CoreModule } from 'src/app/core/core.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
	declarations: [MovieListComponent, MovieItemComponent, MovieDetailsComponent],
	imports: [
		CommonModule,
		MatInputModule,
		MatGridListModule,
		MatCardModule,
		MatButtonModule,
		CoreModule,
		InfiniteScrollModule
	]
})
export class MoviesModule {}
