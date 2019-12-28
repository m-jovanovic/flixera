import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SearchService } from './services/search.service';
import { MovieSearchQuery } from './store/movie-search/movie-search.query';
import { MovieSearchStore } from './store/movie-search/movie-search.store';

@NgModule({
	declarations: [NavBarComponent, SideNavComponent],
	imports: [HttpClientModule, RouterModule, SharedModule, MaterialModule],
	exports: [NavBarComponent, SideNavComponent],
	providers: [SearchService, MovieSearchQuery, MovieSearchStore]
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error('The Core module has already been loaded.');
		}
	}
}
