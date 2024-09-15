import { ngxPermissionsGuard } from 'ngx-permissions';

import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { RoleNames } from '@app/api/common';
import { AdminPermissionsService } from '@app/api/module/admin';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home-page.module').then(
        (module) => module.HomePageModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user-page.module').then(
        (module) => module.UserPageModule
      ),
  },
  {
    canActivate: [ngxPermissionsGuard],
    path: 'admin',
    data: {
      permissions: {
        only: [RoleNames.ADMIN, AdminPermissionsService.viewAdminPage],

        redirectTo: '/error',
      },
    },
    loadChildren: () =>
      import('./pages/admin/admin-page.module').then(
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
