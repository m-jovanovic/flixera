import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { BreakpointState } from '@angular/cdk/layout';
import { Subscription, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { HandsetStateService } from '../../services/handset-state.service';

@Component({
	selector: 'ml-scroll-top',
	templateUrl: './scroll-top.component.html',
	styleUrls: ['./scroll-top.component.css']
})
export class ScrollTopComponent implements OnInit, OnDestroy {
	private subscription: Subscription;
	private scrolledElement: HTMLElement;
	isHandset$: Observable<BreakpointState>;
	isScrolled: boolean;

	constructor(
		private scrollDispatcher: ScrollDispatcher,
		private changeDetectorRef: ChangeDetectorRef,
		private handsetStateService: HandsetStateService
	) {}

	ngOnInit(): void {
		this.isHandset$ = this.handsetStateService.isHandset$;

		this.subscription = this.scrollDispatcher
			.scrolled()
			.pipe(
				debounceTime(100),
				map((scrollable: CdkScrollable) => ({
					element: scrollable.getElementRef().nativeElement,
					scrollTop: scrollable.measureScrollOffset('top')
				}))
			)
			.subscribe(scrollData => {
				this.scrolledElement = scrollData.element;

				this.isScrolled = this.getIsScrolled(scrollData.scrollTop);

				this.changeDetectorRef.detectChanges();
			});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	scrollToTop(): void {
		const scrollTop = this.scrolledElement.scrollTop;

		if (scrollTop <= 0) {
			return;
		}

		window.requestAnimationFrame(this.scrollToTop.bind(this));

		this.scrolledElement.scrollTo(0, scrollTop - scrollTop / 20);
	}

	private getIsScrolled(scrollTop: number): boolean {
		if (scrollTop > 100) {
			return true;
		}

		if (this.isScrolled && scrollTop < 10) {
			return false;
		}
	}
}
