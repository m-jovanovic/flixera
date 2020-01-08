import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material';
import { FriendsRoutingModule } from './friends-routing.module';
import { FriendSearchComponent } from './pages/friend-search/friend-search.page';

@NgModule({
	declarations: [FriendSearchComponent],
	imports: [SharedModule, MaterialModule, FriendsRoutingModule]
})
export class FriendsModule {}
