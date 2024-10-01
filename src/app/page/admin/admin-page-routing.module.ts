import { ngxPermissionsGuard } from 'ngx-permissions';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleNames } from '@app/api/common';

import { AdminPageComponent } from './component';
import {
  AdminSportCategoryPermissionsService,
  AdminSportNetworkPermissionsService,
  AdminSportPlayerPermissionsService,
} from './permissions';
import { AdminUserPermissionsService } from './permissions/admin-user-permissions.service';
import { AdminRolePermissionsService } from './permissions/admin-role-permissions.service';

function createRoutes(): Routes {
  return [
    {
      path: '',
      component: AdminPageComponent,
      children: [
        {
          canActivate: [ngxPermissionsGuard],
          data: {
            permissions: {
              only: [
                RoleNames.ADMIN,
                AdminRolePermissionsService.viewRoleAdminPage,
              ],
              redirectTo: '/error',
            },
          },
          path: 'role',
          loadChildren: () =>
            import('../../module/admin/role/admin/role-admin-page.module').then(
              (lib) => lib.RoleAdminPageModule
            ),
        },
        {
          canActivate: [ngxPermissionsGuard],
          data: {
            permissions: {
              only: [
                RoleNames.ADMIN,
                AdminSportCategoryPermissionsService.viewSportCategoryAdminPage,
              ],
              redirectTo: '/error',
            },
          },
          path: 'sport-category',
          loadChildren: () =>
            import(
              '../../module/admin/sport-category/admin/sport-category-admin-page.module'
            ).then((lib) => lib.SportCategoryAdminPageModule),
        },
        {
          canActivate: [ngxPermissionsGuard],
          data: {
            permissions: {
              only: [
                RoleNames.ADMIN,
                AdminUserPermissionsService.viewUserAdminPage,
              ],
              redirectTo: '/error',
            },
          },
          path: 'user',
          loadChildren: () =>
            import('../../module/admin/user/admin/admin-user.module').then(
              (lib) => lib.AdminUserModule
            ),
        },
        {
          canActivate: [ngxPermissionsGuard],
          data: {
            permissions: {
              only: [
                RoleNames.ADMIN,
                AdminSportPlayerPermissionsService.viewSportPlayerAdminPage,
              ],
              redirectTo: '/error',
            },
          },
          path: 'sport-player',
          loadChildren: () =>
            import(
              '../../module/admin/sport-player/admin/sport-player-admin-page.module'
            ).then((lib) => lib.SportPlayerAdminPageModule),
        },
        {
          canActivate: [ngxPermissionsGuard],
          data: {
            permissions: {
              only: [
                RoleNames.ADMIN,
                AdminSportNetworkPermissionsService.viewSportNetworkAdminPage,
              ],
              redirectTo: '/error',
            },
          },
          path: 'sport-network',
          loadChildren: () =>
            import(
              '../../module/admin/sport-network/admin/sport-network-admin-page.module'
            ).then((lib) => lib.SportNetworkAdminPageModule),
       },
      ],
    },
  ];
}

const routes: Routes = createRoutes();

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
