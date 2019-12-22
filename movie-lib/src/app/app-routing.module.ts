import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from 'src/movies/components/movie-list/movie-list.component';
import { MovieDetailsComponent } from 'src/movies/components/movie-details/movie-details.component';


const routes: Routes = [
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
