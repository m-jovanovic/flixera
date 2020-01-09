import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MaterialModule } from '@app/material';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ResponsiveColumnsDirective } from './directives/responsive-columns/responsive-columns.directive';
import { DefaultImageDirective } from './directives/default-image/default-image.directive';

@NgModule({
	declarations: [ScrollTopComponent, ConfirmDialogComponent, ResponsiveColumnsDirective, DefaultImageDirective],
	entryComponents: [ConfirmDialogComponent],
	imports: [CommonModule, ScrollingModule, MaterialModule],
	exports: [
		CommonModule,
		ResponsiveColumnsDirective,
		ScrollTopComponent,
		DefaultImageDirective
	]
})
export class SharedModule {}
