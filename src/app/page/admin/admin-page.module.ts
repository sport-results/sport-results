import { MenuModule } from 'primeng/menu';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminPermissionsService } from '@app/api/module/admin';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './component';
import { AdminSportCategoryPermissionsService } from './permissions/admin-sport-category-permissions.service';
import { AdminUserPermissionsService } from './permissions/admin-user-permissions.service';
import { AdminRolePermissionsService } from './permissions/admin-role-permissions.service';
import { AdminSportCategoryRulePermissionsService } from './permissions/admin-sport-category-rule-permissions.service';
import { AdminSportNetworkPermissionsService } from './permissions/admin-sport-network-permissions.service';
import { AdminSportPlayerPermissionsService } from './permissions/admin-sport-player-permissions.service';
import { AdminNetworkPlayerPermissionsService } from './permissions/admin-network-player-permissions.service';
import { AdminSportEventPermissionsService } from './permissions/admin-sport-event-permissions.service';

@NgModule({
  declarations: [AdminPageComponent],
  imports: [CommonModule, AdminPageRoutingModule, MenuModule],
  providers: [
    AdminPermissionsService,
    AdminRolePermissionsService,
    AdminSportCategoryPermissionsService,
    AdminUserPermissionsService,
    AdminSportCategoryRulePermissionsService,
    AdminSportNetworkPermissionsService,
    AdminSportPlayerPermissionsService,
    AdminNetworkPlayerPermissionsService,
    AdminSportEventPermissionsService,
  ],
})
export class AdminPageModule {
  constructor(
    adminPermissionsService: AdminPermissionsService,
    adminRolePermissionsService: AdminRolePermissionsService,
    adminSportCategoryPermissionsService: AdminSportCategoryPermissionsService,
    adminSportCategoryRulePermissionsService: AdminSportCategoryRulePermissionsService,
    adminUserPermissionsService: AdminUserPermissionsService,
    adminSportNetworkPermissionsService: AdminSportNetworkPermissionsService,
  ) {}
}
