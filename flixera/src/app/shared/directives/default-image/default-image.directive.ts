import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[mlDefaultImage]'
})
export class DefaultImageDirective {
	@Input()
	defaultImage: string;

	constructor(private elementRef: ElementRef) {}

	@HostListener('error')
	onError(): void {
		const imageElement = this.elementRef.nativeElement as HTMLImageElement;

		imageElement.src = this.defaultImage;
	}
}
