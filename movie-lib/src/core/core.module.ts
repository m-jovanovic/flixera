import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatToolbarModule, 
  MatSidenavModule, 
  MatIconModule, 
  MatButtonModule,
  MatListModule,
  MatDividerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { NavBarComponent, SideNavComponent, MovieApiService } from 'src/core';

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
    MatDividerModule,
    HttpClientModule
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
  ],
  providers: [MovieApiService]
})
export class CoreModule { }
