import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

@NgModule({
	declarations: [MovieListComponent, MovieItemComponent, MovieDetailsComponent],
	imports: [
		SharedModule,
		MaterialModule,
		MoviesRoutingModule,
		InfiniteScrollModule,
		ScrollingModule
	]
})
export class MoviesModule {}
