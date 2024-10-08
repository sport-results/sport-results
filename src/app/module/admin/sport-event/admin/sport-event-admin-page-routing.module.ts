import { ngxPermissionsGuard } from 'ngx-permissions';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportEventAdminPermissionsService } from '@app/api/admin/sport-event';
import { RoleNamesEnum } from '@app/api/common';

import { SportEventAdminPageComponent } from './page/admin';
import {
    SportEventEditPageComponent,
    SportEventEditPageResolverService,
} from './page/edit';
import {
    SportEventListPageComponent,
    SportEventListPageResolverService,
} from './page/list';

const routes: Routes = [
    {
        path: '',
        component: SportEventAdminPageComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list',
            },
            {
                component: SportEventEditPageComponent,
                canActivate: [ngxPermissionsGuard],
                path: 'edit/:sportEventId',
                data: {
                    breadcrumb: 'Edit',
                    permissions: {
                        only: [
                          RoleNamesEnum.ADMIN,
                            SportEventAdminPermissionsService.viewSportEventEditPage,
                        ],
                        redirectTo: '/error',
                    },
                },
                pathMatch: 'full',
                resolve: { data: SportEventEditPageResolverService },
            },
            {
                component: SportEventListPageComponent,
                canActivate: [ngxPermissionsGuard],
                data: {
                    breadcrumb: 'List',
                    permissions: {
                        only: [
                          RoleNamesEnum.ADMIN,
                            SportEventAdminPermissionsService.viewSportEventListPage,
                        ],
                        redirectTo: '/error',
                    },
                },
                path: 'list',
                pathMatch: 'full',
                resolve: { data: SportEventListPageResolverService },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SportEventAdminPageRoutingModule {}
