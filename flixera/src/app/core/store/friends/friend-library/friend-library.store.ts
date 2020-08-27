import { Injectable } from '@angular/core';
import { StoreConfig, EntityStore } from '@datorama/akita';

import { FriendLibraryState } from './friend-library.state';
import { FriendMovie } from '../../../contracts/db/friend-movie';

@StoreConfig({
	name: 'friend-library',
	idKey: 'movieId'
})
@Injectable({
	providedIn: 'root'
})
export class FriendLibraryStore extends EntityStore<
	FriendLibraryState,
	FriendMovie
> {
	constructor() {
		super();
	}
}
