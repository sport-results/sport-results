import { ngxPermissionsGuard } from 'ngx-permissions';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportResultAdminPermissionsService } from '@app/api/admin/sport-result';
import { RoleNamesEnum } from '@app/api/common';

import { SportResultAdminPageComponent } from './page/admin';
import {
    SportResultEditPageComponent,
    SportResultEditPageResolverService,
} from './page/edit';
import {
    SportResultListPageComponent,
    SportResultListPageResolverService,
} from './page/list';

const routes: Routes = [
    {
        path: '',
        component: SportResultAdminPageComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list',
            },
            {
                component: SportResultEditPageComponent,
                canActivate: [ngxPermissionsGuard],
                path: 'edit/:sportResultId',
                data: {
                    breadcrumb: 'Edit',
                    permissions: {
                        only: [
                            RoleNamesEnum.ADMIN,
                            SportResultAdminPermissionsService.viewSportResultEditPage,
                        ],
                        redirectTo: '/error',
                    },
                    backUrl: '../../list',
                },
                pathMatch: 'full',
                resolve: { data: SportResultEditPageResolverService },
            },
            {
                component: SportResultListPageComponent,
                canActivate: [ngxPermissionsGuard],
                data: {
                    breadcrumb: 'List',
                    permissions: {
                        only: [
                            RoleNamesEnum.ADMIN,
                            SportResultAdminPermissionsService.viewSportResultListPage,
                        ],
                        redirectTo: '/error',
                    },

                },
                path: 'list',
                pathMatch: 'full',
                resolve: { data: SportResultListPageResolverService },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SportResultAdminPageRoutingModule {}
