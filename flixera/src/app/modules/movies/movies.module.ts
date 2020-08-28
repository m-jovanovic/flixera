import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieSearchComponent } from './pages/movie-search/movie-search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { AddToMovieLibraryButtonComponent } from './components/add-to-movie-library-button/add-to-movie-library-button.component';
import { MovieLibraryComponent } from './pages/movie-library/movie-library.component';
import { MovieSearchItemComponent } from './components/movie-search-item/movie-search-item.component';

@NgModule({
	declarations: [
		MovieSearchComponent,
		MovieSearchItemComponent,
		MovieDetailsComponent,
		AddToMovieLibraryButtonComponent,
		MovieLibraryComponent
	],
	imports: [
		SharedModule,
		MaterialModule,
		MoviesRoutingModule,
		InfiniteScrollModule,
		ScrollingModule
	]
})
export class MoviesModule {}
