import { Directive, Input } from '@angular/core';

@Directive({
	selector: 'img[default]',
	host: {
		'[src]': 'checkPath(src)',
		'(error)': 'onError()'
	}
})
export class DefaultImageDirective {
	private readonly defaultImage = './assets/images/default-movie-image.jpg';

	@Input()
	src: string;

	@Input()
	default: string;

	checkPath(): string {
		return this.src && this.src !== 'N/A' ? this.src : this.defaultImage;
	}

	onError(): void {
		this.src = this.defaultImage;
	}
}
