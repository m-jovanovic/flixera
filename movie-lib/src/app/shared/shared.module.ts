import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MaterialModule } from '@app/material';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { ResponsiveColumnsDirective } from './directives/responsive-columns/responsive-columns.directive';

@NgModule({
	declarations: [ScrollTopComponent, ResponsiveColumnsDirective],
	imports: [
		CommonModule,
		ScrollingModule,
		MaterialModule
	],
	exports: [
		CommonModule,
		ScrollTopComponent,
		ResponsiveColumnsDirective
	]
})
export class SharedModule {}
