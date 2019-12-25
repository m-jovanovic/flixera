import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [ScrollTopComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [ScrollTopComponent]
})
export class SharedModule { }
