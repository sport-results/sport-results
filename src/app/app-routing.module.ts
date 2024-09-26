import { ngxPermissionsGuard } from 'ngx-permissions';

import { NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ExtraOptions,
  RouterModule,
  Routes,
} from '@angular/router';

import { ActionEnum, RoleNames } from '@app/api/common';
import { AdminPermissionsService } from '@app/api/module/admin';

const calculateUserPermission = (
  route: ActivatedRouteSnapshot,
) => {
  return [`${ActionEnum.SOME}${route.params['userId']}`];
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./page/home/home-page.module').then(
        (module) => module.HomePageModule
      ),
  },
  {
    path: 'user/:userId',
    canActivate: [ngxPermissionsGuard],
    data: {
      permissions: {
        only: calculateUserPermission,
        redirectTo: '/error',
      },
    },
    loadChildren: () =>
      import('./page/user/user-page.module').then(
        (module) => module.UserPageModule
      ),
  },
  {
    path: 'admin',
    canActivate: [ngxPermissionsGuard],
    data: {
      permissions: {
        only: [RoleNames.ADMIN, AdminPermissionsService.viewAdminPage],

        redirectTo: '/error',
      },
    },
    loadChildren: () =>
      import('./page/admin/admin-page.module').then(
        (module) => module.AdminPageModule
      ),
  },
];

const routerOptions: ExtraOptions = {
  bindToComponentInputs: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
