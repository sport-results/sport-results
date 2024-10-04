import { ngxPermissionsGuard } from 'ngx-permissions';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportNetworkAdminPermissionsService } from '@app/api/admin/sport-network';
import { RoleNames } from '@app/api/common';

import { SportNetworkAdminPageComponent } from './page/admin';
import {
    SportNetworkEditPageComponent,
    SportNetworkEditPageResolverService,
} from './page/edit';
import {
    SportNetworkListPageComponent,
    SportNetworkListPageResolverService,
} from './page/list';

const routes: Routes = [
    {
        path: '',
        component: SportNetworkAdminPageComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list',
            },
            {
                component: SportNetworkEditPageComponent,
                canActivate: [ngxPermissionsGuard],
                path: 'edit/:sportNetworkId',
                data: {
                    breadcrumb: 'Edit',
                    permissions: {
                        only: [
                            RoleNames.ADMIN,
                            SportNetworkAdminPermissionsService.viewSportNetworkEditPage,
                        ],
                        redirectTo: '/error',
                    },
                    backUrl: '../../list',
                },
                pathMatch: 'full',
                resolve: { data: SportNetworkEditPageResolverService },
            },
            {
                component: SportNetworkListPageComponent,
                canActivate: [ngxPermissionsGuard],
                data: {
                    breadcrumb: 'List',
                    permissions: {
                        only: [
                            RoleNames.ADMIN,
                            SportNetworkAdminPermissionsService.viewSportNetworkListPage,
                        ],
                        redirectTo: '/error',
                    },
                },
                path: 'list',
                pathMatch: 'full',
                resolve: { data: SportNetworkListPageResolverService },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SportNetworkAdminPageRoutingModule {}
