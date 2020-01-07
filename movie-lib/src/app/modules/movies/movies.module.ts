import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { AddToLibraryButtonComponent } from './components/add-to-library-button/add-to-library-button.component';
import { MovieLibraryComponent } from './components/movie-library/movie-library.component';
import { NavigateToDetailsButtonComponent } from './components/navigate-to-details-button/navigate-to-details-button.component';

@NgModule({
	declarations: [MovieListComponent, MovieItemComponent, MovieDetailsComponent, AddToLibraryButtonComponent, MovieLibraryComponent, NavigateToDetailsButtonComponent],
	imports: [
		SharedModule,
		MaterialModule,
		MoviesRoutingModule,
		InfiniteScrollModule,
		ScrollingModule
	]
})
export class MoviesModule {}
