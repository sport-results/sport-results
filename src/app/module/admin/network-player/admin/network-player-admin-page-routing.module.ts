import { ngxPermissionsGuard } from 'ngx-permissions';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetworkPlayerAdminPermissionsService } from '@app/api/admin/network-player';
import { RoleNamesEnum } from '@app/api/common';

import { NetworkPlayerAdminPageComponent } from './page/admin';
import {
  NetworkPlayerEditPageComponent,
  NetworkPlayerEditPageResolverService,
} from './page/edit';
import {
  NetworkPlayerListPageComponent,
  NetworkPlayerListPageResolverService,
} from './page/list';

const routes: Routes = [
  {
    path: '',
    component: NetworkPlayerAdminPageComponent,
    children: [
      {
        component: NetworkPlayerEditPageComponent,
        canActivate: [ngxPermissionsGuard],
        path: 'edit/:networkPlayerId',
        data: {
          breadcrumb: 'Edit',
          permissions: {
            only: [
              RoleNamesEnum.ADMIN,
              NetworkPlayerAdminPermissionsService.viewNetworkPlayerEditPage,
            ],
            redirectTo: '/error',
          },
        },
        pathMatch: 'full',
        resolve: { data: NetworkPlayerEditPageResolverService },
      },
      {
        component: NetworkPlayerListPageComponent,
        canActivate: [ngxPermissionsGuard],
        data: {
          breadcrumb: 'List',
          permissions: {
            only: [
              RoleNamesEnum.ADMIN,
              NetworkPlayerAdminPermissionsService.viewNetworkPlayerListPage,
            ],
            redirectTo: '/error',
          },
        },
        path: 'list',
        pathMatch: 'full',
        resolve: { data: NetworkPlayerListPageResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkPlayerAdminPageRoutingModule {}
