import { Directive, Input } from '@angular/core';

@Directive({
	selector: '[mlDefaultImage]',
	host: {
		'[src]': 'checkPath(src)',
		'(error)': 'onError()'
	}
})
export class DefaultImageDirective {
	@Input()
	src: string;

	@Input()
	defaultImage: string;

	checkPath(): string {
		return this.src && this.src !== 'N/A' ? this.src : this.defaultImage;
	}

	onError(): void {
		this.src = this.defaultImage;
	}
}
