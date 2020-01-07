import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieSearchComponent } from './pages/movie-search/movie-search.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { AddToLibraryButtonComponent } from './components/add-to-library-button/add-to-library-button.component';
import { MovieLibraryComponent } from './pages/movie-library/movie-library.component';
import { NavigateToDetailsButtonComponent } from './components/navigate-to-details-button/navigate-to-details-button.component';

@NgModule({
	declarations: [
		MovieSearchComponent,
		MovieItemComponent,
		MovieDetailsComponent,
		AddToLibraryButtonComponent,
		MovieLibraryComponent,
		NavigateToDetailsButtonComponent
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
