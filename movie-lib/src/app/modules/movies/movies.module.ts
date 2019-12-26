import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatInputModule,
	MatGridListModule,
	MatCardModule,
	MatButtonModule
} from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {
	MovieListComponent,
	MovieItemComponent,
	MovieDetailsComponent,
	MoviesRoutingModule
} from '../movies';
import { CoreModule } from '../../core';
import { SharedModule } from '../../shared';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [MovieListComponent, MovieItemComponent, MovieDetailsComponent],
	imports: [
		CommonModule,
		MatInputModule,
		MatGridListModule,
		MatCardModule,
		MatButtonModule,
		CoreModule,
		InfiniteScrollModule,
		MoviesRoutingModule,
		ScrollingModule,
		FormsModule,
		SharedModule
	]
})
export class MoviesModule {}
