import { MenuModule } from 'primeng/menu';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminPermissionsService } from '@app/api/module/admin';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './component';

@NgModule({
  declarations: [AdminPageComponent],
  imports: [CommonModule, AdminPageRoutingModule, MenuModule],
  providers: [AdminPermissionsService],
})
export class AdminPageModule {}
