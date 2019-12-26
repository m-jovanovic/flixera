import { Directive, OnInit, OnDestroy, Input } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatGridList } from '@angular/material';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { MediaQueryColCountPair } from './media-query-col-count-pair';

@Directive({
	selector: '[mlResponsiveColumns]'
})
export class ResponsiveColumnsDirective implements OnInit, OnDestroy {
	private readonly defaultColCount = 1;
	subscription: Subscription;
	@Input('mlResponsiveColumns')
	mediaQueries: MediaQueryColCountPair[];

	constructor(
		private grid: MatGridList,
		private breakpointObserver: BreakpointObserver
	) {}

	ngOnInit(): void {
		this.subscription = this.breakpointObserver
			.observe(this.mediaQueries.map(pair => pair.mediaQuery))
			.pipe(
				map(state => {
					const colCounts = this.mediaQueries
						.filter(pair => state.breakpoints[pair.mediaQuery])
						.map(pair => pair.colCount)
						.sort((a, b) => b - a);

					return colCounts.length > 0 ? colCounts[0] : this.defaultColCount;
				})
			)
			.subscribe(value => (this.grid.cols = value));
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
