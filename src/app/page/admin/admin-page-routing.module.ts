import { ngxPermissionsGuard } from 'ngx-permissions';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleNames } from '@app/api/common';

import { AdminPageComponent } from './component';
import { AdminSportCategoryPermissionsService } from './permissions';

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
