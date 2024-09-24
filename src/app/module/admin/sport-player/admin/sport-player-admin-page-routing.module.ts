import { ngxPermissionsGuard } from 'ngx-permissions';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportPlayerAdminPermissionsService } from '@app/api/admin/sport-player';
import { RoleNames } from '@app/api/common';

import { SportPlayerAdminPageComponent } from './page/admin';
import {
    SportPlayerEditPageComponent,
    SportPlayerEditPageResolverService,
} from './page/edit';
import {
    SportPlayerListPageComponent,
    SportPlayerListPageResolverService,
} from './page/list';

const routes: Routes = [
    {
        path: '',
        component: SportPlayerAdminPageComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list',
            },
            {
                component: SportPlayerEditPageComponent,
                canActivate: [ngxPermissionsGuard],
                path: 'edit/:sportPlayerId',
                data: {
                    breadcrumb: 'Edit',
                    permissions: {
                        only: [
                            RoleNames.ADMIN,
                            SportPlayerAdminPermissionsService.viewSportPlayerEditPage,
                        ],
                        redirectTo: '/error',
                    },
                },
                pathMatch: 'full',
                resolve: { data: SportPlayerEditPageResolverService },
            },
            {
                component: SportPlayerListPageComponent,
                canActivate: [ngxPermissionsGuard],
                data: {
                    breadcrumb: 'List',
                    permissions: {
                        only: [
                            RoleNames.ADMIN,
                            SportPlayerAdminPermissionsService.viewSportPlayerListPage,
                        ],
                        redirectTo: '/error',
                    },
                },
                path: 'list',
                pathMatch: 'full',
                resolve: { data: SportPlayerListPageResolverService },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SportPlayerAdminPageRoutingModule {}
