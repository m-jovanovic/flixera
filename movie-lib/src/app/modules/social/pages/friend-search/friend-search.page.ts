import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	OnDestroy
} from '@angular/core';
import {
	Observable,
	fromEvent,
	combineLatest,
	Subject,
	Subscription
} from 'rxjs';
import {
	map,
	filter,
	distinctUntilChanged,
	debounceTime
} from 'rxjs/operators';

import { User } from '@app/core/models/user';
import { FriendSearchService, FriendSearchQuery } from '@app/core';

@Component({
	selector: 'ml-friend-search',
	templateUrl: './friend-search.page.html',
	styleUrls: ['./friend-search.page.css']
})
export class FriendSearchComponent implements OnInit, OnDestroy {
	private keyUpSubscription: Subscription;
	private searchSubscription: Subscription;
	searchTermExists$: Observable<boolean>;
	users$: Observable<User[]>;

	start: Subject<string> = new Subject();
	end: Subject<string> = new Subject();

	@ViewChild('friendSearchInput', {
		static: true
	})
	friendSearchInput: ElementRef;

	constructor(
		private friendSearchService: FriendSearchService,
		private friendSearchQuery: FriendSearchQuery
	) {}

	ngOnInit() {
		this.users$ = this.friendSearchQuery.selectAll();

		this.searchSubscription = combineLatest(this.start, this.end).subscribe(
			([start, end]) => {
				this.friendSearchService.searchFriends(start, end);
			}
		);

		const keyUpObservable = fromEvent(
			this.friendSearchInput.nativeElement,
			'keyup'
		).pipe(
			map((event: KeyboardEvent) => {
				return (<HTMLInputElement>event.target).value;
			})
		);

		this.searchTermExists$ = keyUpObservable.pipe(
			map(searchTerm => searchTerm.length > 0)
		);

		this.keyUpSubscription = keyUpObservable
			.pipe(
				filter(value => value.length > 2),
				distinctUntilChanged(),
				debounceTime(400)
			)
			.subscribe(searchTerm => {
				this.start.next(searchTerm);

				this.end.next(`${searchTerm}${'\uf8ff'}`);
			});
	}

	ngOnDestroy(): void {
		this.start.complete();
		this.end.complete();
		this.searchSubscription.unsubscribe();
		this.keyUpSubscription.unsubscribe();
	}

	onClearClick(): void {
		this.friendSearchService.clearFriends();

		(<HTMLInputElement>this.friendSearchInput.nativeElement).value = '';
	}
}
