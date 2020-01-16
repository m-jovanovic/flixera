import { Injectable } from '@angular/core';
import { StoreConfig, EntityStore } from '@datorama/akita';

import { FriendLibraryState } from './friend-library.state';
import { Movie } from '../../../contracts/db/movie';

@StoreConfig({
	name: 'friend-library',
	idKey: 'movieId'
})
@Injectable({
	providedIn: 'root'
})
export class FriendLibraryStore extends EntityStore<
	FriendLibraryState,
	Movie
> {
	constructor() {
		super();
	}
}
