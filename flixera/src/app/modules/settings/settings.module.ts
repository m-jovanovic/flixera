import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
	declarations: [SettingsComponent],
	imports: [SharedModule, SettingsRoutingModule, MaterialModule]
})
export class SettingsModule {}
