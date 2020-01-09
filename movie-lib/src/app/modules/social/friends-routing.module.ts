import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendSearchComponent } from './pages/friend-search/friend-search.component';

const routes: Routes = [
	{
		path: 'search',
		component: FriendSearchComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FriendsRoutingModule {}
