import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MaterialModule } from '@app/material';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { ResponsiveColumnsDirective } from './directives/responsive-columns/responsive-columns.directive';

@NgModule({
	declarations: [ResponsiveColumnsDirective, ScrollTopComponent],
	imports: [CommonModule, ScrollingModule, MaterialModule],
	exports: [
		CommonModule,
		ResponsiveColumnsDirective,
		ScrollTopComponent
	]
})
export class SharedModule {}
