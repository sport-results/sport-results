import { ngxPermissionsGuard } from 'ngx-permissions';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAdminPermissionsService } from '@app/api/admin/role';
import { RoleNamesEnum } from '@app/api/common';

import { RoleAdminPageComponent } from './page/admin';
import {
  RoleEditPageComponent,
  RoleEditPageResolverService,
} from './page/edit';
import {
  RoleListPageComponent,
  RoleListPageResolverService,
} from './page/list';

const routes: Routes = [
  {
    path: '',
    component: RoleAdminPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        component: RoleEditPageComponent,
        canActivate: [ngxPermissionsGuard],
        data: {
          breadcrumb: 'Edit',
          permissions: {
            only: [
              RoleNamesEnum.ADMIN,
              RoleAdminPermissionsService.viewRoleEditPage,
            ],
            redirectTo: '/error',
          },
          backUrl: '../../list',
        },
        path: 'edit/:roleId',
        pathMatch: 'full',
        resolve: { data: RoleEditPageResolverService },
      },
      {
        component: RoleListPageComponent,
        canActivate: [ngxPermissionsGuard],
        data: {
          breadcrumb: 'List',
          permissions: {
            only: [
              RoleNamesEnum.ADMIN,
              RoleAdminPermissionsService.viewRoleListPage,
            ],
            redirectTo: '/error',
          },
        },
        path: 'list',
        pathMatch: 'full',
        resolve: { data: RoleListPageResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleAdminPageRoutingModule {}
