import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendSearchComponent } from './pages/friend-search/friend-search.component';
import { FriendRequestsComponent } from './pages/friend-requests/friend-requests.component';
import { FriendListComponent } from './pages/friend-list/friend-list.component';

const routes: Routes = [
	{
		path: 'list',
		component: FriendListComponent
	},
	{
		path: 'search',
		component: FriendSearchComponent
	},
	{
		path: 'requests',
		component: FriendRequestsComponent	
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FriendsRoutingModule {}
