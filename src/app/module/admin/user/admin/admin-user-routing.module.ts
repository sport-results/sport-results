import { NgxPermissionsGuard } from 'ngx-permissions';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAdminPermissionsService } from '@app/api/admin/user';
import { RoleNamesEnum } from '@app/api/common';

import { UserAdminPageComponent } from './page/admin';
import {
  UserEditPageComponent,
  UserEditPageResolverService,
} from './page/edit';
import {
  UserListPageComponent,
  UserListPageResolverService,
} from './page/list';

const routes: Routes = [
  {
    path: '',
    component: UserAdminPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        component: UserEditPageComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          breadcrumb: 'Edit',
          permissions: {
            only: [
              RoleNamesEnum.ADMIN,
              UserAdminPermissionsService.viewUserEditPage,
            ],
            redirectTo: '/error',
          },
        },
        path: 'edit/:userId',
        pathMatch: 'full',
        resolve: { data: UserEditPageResolverService },
      },
      {
        component: UserListPageComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          breadcrumb: 'List',
          permissions: {
            only: [
              RoleNamesEnum.ADMIN,
              UserAdminPermissionsService.viewUserListPage,
            ],
            redirectTo: '/error',
          },
        },
        path: 'list',
        pathMatch: 'full',
        resolve: { data: UserListPageResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUserRoutingModule {}
