import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule, MatButtonModule } from '@angular/material';

import { ScrollTopComponent, ResponsiveColumnsDirective } from './';

@NgModule({
	declarations: [ScrollTopComponent, ResponsiveColumnsDirective],
	imports: [CommonModule, ScrollingModule, MatIconModule, MatButtonModule],
	exports: [ScrollTopComponent, ResponsiveColumnsDirective]
})
export class SharedModule {}
