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
		redirectTo: 'movies/library',
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
			},
			{
				path: 'friends',
				loadChildren: () =>
					import('./modules/friends/friends.module').then(m => m.FriendsModule),
				canLoad: [AuthGuard]
			},
			{
				path: 'settings',
				loadChildren: () =>
					import('./modules/settings/settings.module').then(m => m.SettingsModule),
				canLoad: [AuthGuard]
			},
		]
	},
	{
		path: '',
		component: BlankLayoutComponent,
		children: [
			{
				path: 'login',
				loadChildren: () =>
					import('./modules/login/login.module').then(m => m.LoginModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'movies/library'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
