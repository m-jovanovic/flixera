import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { FooterLayoutComponent } from './components/footer-layout/footer-layout.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NavBarMenuComponent } from './components/nav-bar-menu/nav-bar-menu.component';
import { SideNavMenuComponent } from './components/side-nav-menu/side-nav-menu.component';

@NgModule({
	declarations: [
		MainLayoutComponent,
		FooterLayoutComponent,
		SideNavComponent,
		NavBarMenuComponent,
		SideNavMenuComponent
	],
	imports: [
		HttpClientModule,
		AngularFireAuthModule,
		AngularFirestoreModule,
		SharedModule,
		MaterialModule,
		RouterModule
	],
	exports: [MainLayoutComponent, FooterLayoutComponent]
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error('The Core module has already been loaded.');
		}
	}
}
