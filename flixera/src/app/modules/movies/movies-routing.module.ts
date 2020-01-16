import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieLibraryComponent } from './pages/movie-library/movie-library.component';
import { MovieSearchComponent } from './pages/movie-search/movie-search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';

const routes: Routes = [
	{
		path: 'library',
		component: MovieLibraryComponent
	},
	{
		path: 'search',
		component: MovieSearchComponent
	},
	{
		path: ':id',
		component: MovieDetailsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MoviesRoutingModule {}
