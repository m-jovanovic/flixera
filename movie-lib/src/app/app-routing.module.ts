import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
	MainLayoutComponent,
	BlankLayoutComponent,
	AuthGuard
} from '@app/core';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'movies',
		pathMatch: 'full'
	},
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{
				path: 'movies',
				loadChildren: () =>
					import('./modules/movies/movies.module').then(m => m.MoviesModule),
				canLoad: [AuthGuard]
			}
		]
	},
	{
		path: '',
		component: BlankLayoutComponent,
		children: [
			{
				path: 'login',
				loadChildren: () =>
					import('./login/login.module').then(m => m.LoginModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
