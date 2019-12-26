import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
	selector: 'ml-scroll-top',
	templateUrl: './scroll-top.component.html',
	styleUrls: ['./scroll-top.component.css']
})
export class ScrollTopComponent implements OnInit, OnDestroy {
	subscription: Subscription;
	isScrolled: boolean;
	scrolledElement: HTMLElement;

	constructor(
		private dispatcher: ScrollDispatcher,
		private ref: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.subscription = this.dispatcher
			.scrolled()
			.pipe(
				debounceTime(100),
				map((scrollable: CdkScrollable) => ({
					element: scrollable.getElementRef().nativeElement,
					scrollTop: scrollable.measureScrollOffset("top")
				}))
			)
			.subscribe(scrollData => {
				this.scrolledElement = scrollData.element;

				this.isScrolled = this.getIsScrolled(scrollData.scrollTop);

				this.ref.detectChanges();
			});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	getIsScrolled(scrollTop: number): boolean {
		if (scrollTop > 100) {
			return true;
		}

		if (this.isScrolled && scrollTop < 10) {
			return false;
		}
	}

	scrollToTop(): void {
		const currentScroll = this.scrolledElement.scrollTop;

		if (currentScroll <= 0) {
			return;
		}

		window.requestAnimationFrame(this.scrollToTop.bind(this));

		this.scrolledElement.scrollTo(0, currentScroll - currentScroll / 20);
	}
}
