import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule, MatButtonModule } from '@angular/material';

import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { ResponsiveColumnsDirective } from './directives/responsive-columns/responsive-columns.directive';

@NgModule({
	declarations: [ScrollTopComponent, ResponsiveColumnsDirective],
	imports: [CommonModule, ScrollingModule, MatIconModule, MatButtonModule],
	exports: [ScrollTopComponent, ResponsiveColumnsDirective]
})
export class SharedModule {}
