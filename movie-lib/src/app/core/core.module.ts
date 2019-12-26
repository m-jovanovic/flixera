import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatToolbarModule,
	MatSidenavModule,
	MatIconModule,
	MatButtonModule,
	MatListModule,
	MatDividerModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import {
	NavBarComponent,
	SideNavComponent,
	SearchService,
	MovieSearchQuery,
	MovieSearchStore
} from 'src/app/core';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [NavBarComponent, SideNavComponent],
	imports: [
		CommonModule,
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatListModule,
		MatDividerModule,
		HttpClientModule,
		RouterModule
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
	providers: [SearchService, MovieSearchQuery, MovieSearchStore]
})
export class CoreModule {}
