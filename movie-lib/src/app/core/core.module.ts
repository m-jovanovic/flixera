import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
	MatToolbarModule,
	MatSidenavModule,
	MatIconModule,
	MatButtonModule,
	MatListModule,
	MatDividerModule
} from '@angular/material';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SearchService } from './services/search.service';
import { MovieSearchQuery } from './store/movie-search/movie-search.query';
import { MovieSearchStore } from './store/movie-search/movie-search.store';

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
