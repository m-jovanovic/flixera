import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatInputModule,
	MatGridListModule,
	MatCardModule,
	MatButtonModule,
	MatSnackBarModule
} from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CoreModule } from '../../core';
import { SharedModule } from '../../shared';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

@NgModule({
	declarations: [MovieListComponent, MovieItemComponent, MovieDetailsComponent],
	imports: [
		CommonModule,
		MatInputModule,
		MatGridListModule,
		MatCardModule,
		MatButtonModule,
		MatSnackBarModule,
		CoreModule,
		InfiniteScrollModule,
		MoviesRoutingModule,
		ScrollingModule,
		SharedModule
	]
})
export class MoviesModule {}
