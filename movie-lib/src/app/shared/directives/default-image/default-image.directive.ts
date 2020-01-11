import { Directive, Input } from '@angular/core';

@Directive({
	selector: '[default]',
	host: {
		'[src]': 'checkPath(src)',
		'(error)': 'onError()'
	}
})
export class DefaultImageDirective {
	@Input()
	src: string;

	@Input()
	default: string;

	checkPath(): string {
		return this.src && this.src !== 'N/A' ? this.src : this.default;
	}

	onError(): void {
		this.src = this.default;
	}
}
