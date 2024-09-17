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

@NgModule({
  declarations: [AdminPageComponent],
  imports: [CommonModule, AdminPageRoutingModule, MenuModule],
  providers: [
    AdminPermissionsService,
    AdminRolePermissionsService,
    AdminSportCategoryPermissionsService,
    AdminUserPermissionsService,
    AdminSportCategoryRulePermissionsService,
  ],
})
export class AdminPageModule {
  constructor(
    adminPermissionsService: AdminPermissionsService,
    adminRolePermissionsService: AdminRolePermissionsService,
    adminSportCategoryPermissionsService: AdminSportCategoryPermissionsService,
    adminUserPermissionsService: AdminUserPermissionsService
  ) {}
}
