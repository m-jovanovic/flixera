import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable, fromEvent, combineLatest, Subject, Subscription } from 'rxjs';
import { map, filter, distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { User, FriendSearchService, FriendSearchQuery, FriendRequestsService } from '@app/core';

@Component({
	selector: 'ml-friend-search',
	templateUrl: './friend-search.component.html',
	styleUrls: ['./friend-search.component.css']
})
export class FriendSearchComponent implements OnInit, OnDestroy {
	private readonly searchTermStart: Subject<string> = new Subject();
	private readonly searchTermEnd: Subject<string> = new Subject();
	private keyUpSubscription: Subscription;
	private searchSubscription: Subscription;
	searchTermExists$: Observable<boolean>;
	users$: Observable<User[]>;

	@ViewChild('friendSearchInput', {
		static: true
	})
	friendSearchInput: ElementRef;

	constructor(
		private friendSearchService: FriendSearchService,
		private friendSearchQuery: FriendSearchQuery,
		private friendRequestsService: FriendRequestsService
	) {}

	ngOnInit(): void {
		this.users$ = this.friendSearchQuery.selectAll();

		this.subscribeToSearchTermSubjects();

		this.subscribeToKeyUpObservable();
	}

	ngOnDestroy(): void {
		this.searchTermStart.complete();

		this.searchTermEnd.complete();

		this.searchSubscription.unsubscribe();

		this.keyUpSubscription.unsubscribe();
	}

	onClearClick(): void {
		this.friendSearchService.clearFriends();

		(this.friendSearchInput.nativeElement as HTMLInputElement).value = '';
	}

	async sendFriendRequest(friend: User): Promise<void> {
		await this.friendRequestsService.sendFriendRequest(friend.uid);
	}

	trackByFunction(_: any, item: any): any {
		return item.uid;
	}

	private subscribeToSearchTermSubjects(): void {
		this.searchSubscription = combineLatest([this.searchTermStart, this.searchTermEnd]).subscribe(([start, end]) => {
			this.friendSearchService.searchFriends(start, end);
		});
	}

	private subscribeToKeyUpObservable(): void {
		const keyUpObservable = this.getKeyUpObservable();

		this.searchTermExists$ = keyUpObservable.pipe(map((searchTerm) => searchTerm.length > 0));

		this.keyUpSubscription = keyUpObservable
			.pipe(
				filter((value) => value.length > 2),
				distinctUntilChanged(),
				debounceTime(400)
			)
			.subscribe((searchTerm) => {
				this.searchTermStart.next(searchTerm);

				this.searchTermEnd.next(`${searchTerm}${'\uf8ff'}`);
			});
	}

	private getKeyUpObservable(): Observable<string> {
		return fromEvent(this.friendSearchInput.nativeElement, 'keyup').pipe(
			map((event: KeyboardEvent) => {
				return (event.target as HTMLInputElement).value;
			})
		);
	}
}
