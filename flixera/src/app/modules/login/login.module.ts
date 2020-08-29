import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '@app/shared';
import { LoginRoutingModule } from './login-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material';

@NgModule({
	declarations: [LoginComponent],
	imports: [MaterialModule, SharedModule, LoginRoutingModule, FlexLayoutModule]
})
export class LoginModule {}
