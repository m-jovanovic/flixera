import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '@app/shared';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, SharedModule, LoginRoutingModule]
})
export class LoginModule {}
