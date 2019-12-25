import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule, MatButtonModule } from '@angular/material';

import { ScrollTopComponent } from './scroll-top/scroll-top.component';

@NgModule({
	declarations: [ScrollTopComponent],
	imports: [CommonModule, ScrollingModule, MatIconModule, MatButtonModule],
	exports: [ScrollTopComponent]
})
export class SharedModule {}
