import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { MovieLibraryService, FriendLibraryQuery, FriendMovie, MovieLikesService, SettingsQuery } from '@app/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'ml-friend-library',
	templateUrl: './friend-library.component.html',
	styleUrls: ['./friend-library.component.css']
})
export class FriendLibraryComponent implements OnInit {
	isLoading$: Observable<boolean>;
	movies$: Observable<FriendMovie[]>;
	isSmallScreen$: Observable<BreakpointState>;
	isLightMode$: Observable<boolean>;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private movieLibraryService: MovieLibraryService,
		private friendLibraryQuery: FriendLibraryQuery,
		private movieLikesService: MovieLikesService,
		private breakpointObserver: BreakpointObserver,
		private settingsQuery: SettingsQuery
	) {}

	ngOnInit() {
		const friendId = this.friendId;

		if (friendId.length === 0) {
			this.router.navigate(['/friends/list']);
		}

		this.isLoading$ = this.friendLibraryQuery.selectLoading();

		this.movies$ = this.friendLibraryQuery.selectAll();

		this.movieLibraryService.getFriendsLibrary(friendId);

		this.isSmallScreen$ = this.breakpointObserver.observe('(min-width: 700px)');

		this.isLightMode$ = this.settingsQuery.isLightMode$;
	}

	async likeMovie(movieId: string): Promise<void> {
		if (this.friendLibraryQuery.isLiked(movieId)) {
			await this.movieLikesService.unlike(this.friendId, movieId);
		} else {
			await this.movieLikesService.like(this.friendId, movieId);
		}
	}

	trackByFunction(_: any, item: any): any {
		return item.movieId;
	}

	private get friendId(): string {
		return this.route.snapshot.paramMap.get('friendId');
	}
}
