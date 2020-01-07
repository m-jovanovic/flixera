import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieLibraryComponent } from './components/movie-library/movie-library.component';

const routes: Routes = [
	{
		path: 'search',
		component: MovieListComponent
	},
	{
		path: 'library',
		component: MovieLibraryComponent
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
