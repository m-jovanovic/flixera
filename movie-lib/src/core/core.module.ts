import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatToolbarModule, 
  MatSidenavModule, 
  MatIconModule, 
  MatButtonModule,
  MatListModule,
  MatDividerModule } from '@angular/material';

import { NavBarComponent, SideNavComponent } from 'src/core';

@NgModule({
  declarations: [
    NavBarComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [
    NavBarComponent,
    SideNavComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule
  ]
})
export class CoreModule { }
