import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

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
				tap((data: CdkScrollable) => {
					this.scrolledElement = data.getElementRef().nativeElement;

					this.isScrolled = this.getIsScrolled();

					this.ref.detectChanges();
				})
			)
			.subscribe();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	getIsScrolled(): boolean {
		if (this.scrolledElement.scrollTop > 100) {
			return true;
		}

		if (this.isScrolled && this.scrolledElement.scrollTop < 10) {
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
