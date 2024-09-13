import { NgxPermissionsGuard } from 'ngx-permissions';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleNames } from '@app/api/common';

import { RoleAdminPageComponent } from './page/admin';
import {
    RoleEditPageComponent,
    RoleEditPageResolverService,
} from './page/edit';
import {
    RoleListPageComponent,
    RoleListPageResolverService,
} from './page/list';
import { RoleAdminPermissionsService } from './service';

const routes: Routes = [
    {
        path: '',
        component: RoleAdminPageComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list',
            },
            {
                component: RoleEditPageComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    breadcrumb: 'Edit',
                    permissions: {
                        only: [
                            RoleNames.ADMIN,
                            RoleAdminPermissionsService.viewRoleEditPage,
                        ],
                        redirectTo: '/error',
                    },
                },
                path: 'edit/:roleId',
                pathMatch: 'full',
                resolve: { data: RoleEditPageResolverService },
            },
            {
                component: RoleListPageComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    breadcrumb: 'List',
                    permissions: {
                        only: [
                            RoleNames.ADMIN,
                            RoleAdminPermissionsService.viewRoleListPage,
                        ],
                        redirectTo: '/error',
                    },
                },
                path: 'list',
                pathMatch: 'full',
                resolve: { data: RoleListPageResolverService },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoleAdminPageRoutingModule {}
