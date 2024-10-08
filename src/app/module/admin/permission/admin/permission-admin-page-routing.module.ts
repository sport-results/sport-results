import { ngxPermissionsGuard } from 'ngx-permissions';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionAdminPermissionsService } from '@app/api/admin/permission';
import { RoleNamesEnum } from '@app/api/common';

import { PermissionAdminPageComponent } from './page/admin';
import {
  PermissionEditPageComponent,
  PermissionEditPageResolverService,
} from './page/edit';
import {
  PermissionListPageComponent,
  PermissionListPageResolverService,
} from './page/list';

const routes: Routes = [
  {
    path: '',
    component: PermissionAdminPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        component: PermissionEditPageComponent,
        canActivate: [ngxPermissionsGuard],
        path: 'edit/:permissionId',
        data: {
          breadcrumb: 'Edit',
          permissions: {
            only: [
              RoleNamesEnum.ADMIN,
              PermissionAdminPermissionsService.viewPermissionEditPage,
            ],
            redirectTo: '/error',
          },
        },
        pathMatch: 'full',
        resolve: { data: PermissionEditPageResolverService },
      },
      {
        component: PermissionListPageComponent,
        canActivate: [ngxPermissionsGuard],
        data: {
          breadcrumb: 'List',
          permissions: {
            only: [
              RoleNamesEnum.ADMIN,
              PermissionAdminPermissionsService.viewPermissionListPage,
            ],
            redirectTo: '/error',
          },
        },
        path: 'list',
        pathMatch: 'full',
        resolve: { data: PermissionListPageResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionAdminPageRoutingModule {}
