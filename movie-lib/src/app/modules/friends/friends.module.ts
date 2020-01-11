import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material';
import { FriendsRoutingModule } from './friends-routing.module';
import { FriendSearchComponent } from './pages/friend-search/friend-search.component';
import { FriendRequestsComponent } from './pages/friend-requests/friend-requests.component';
import { FriendListComponent } from './pages/friend-list/friend-list.component';

@NgModule({
	declarations: [FriendSearchComponent, FriendRequestsComponent, FriendListComponent],
	imports: [SharedModule, MaterialModule, FriendsRoutingModule]
})
export class FriendsModule {}
