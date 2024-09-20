import { ngxPermissionsGuard } from 'ngx-permissions';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportCategoryAdminPermissionsService } from '@app/api/admin/sport-category';
import { RoleNames } from '@app/api/common';

import { SportCategoryAdminPageComponent } from './page/admin';
import {
    SportCategoryEditPageComponent,
    SportCategoryEditPageResolverService,
} from './page/edit';
import {
    SportCategoryListPageComponent,
    SportCategoryListPageResolverService,
} from './page/list';
import { SportCategoryRuleEditPageComponent } from './page/edit-rule';

const routes: Routes = [
    {
        path: '',
        component: SportCategoryAdminPageComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list',
            },
            {
                component: SportCategoryEditPageComponent,
                canActivate: [ngxPermissionsGuard],
                path: 'edit/:sportCategoryId',
                data: {
                    breadcrumb: 'Edit',
                    permissions: {
                        only: [
                            RoleNames.ADMIN,
                            SportCategoryAdminPermissionsService.viewSportCategoryEditPage,
                        ],
                        redirectTo: '/error',
                    },
                },
                pathMatch: 'full',
                resolve: { data: SportCategoryEditPageResolverService },
            },
            {
                component: SportCategoryRuleEditPageComponent,
                canActivate: [ngxPermissionsGuard],
                path: 'edit-rule/:sportCategoryId/:sportCategoryRuleId',
                data: {
                    breadcrumb: 'Edit',
                    permissions: {
                        only: [
                            RoleNames.ADMIN,
                            SportCategoryAdminPermissionsService.viewSportCategoryEditPage,
                        ],
                        redirectTo: '/error',
                    },
                },
                pathMatch: 'full',
                resolve: { data: SportCategoryEditPageResolverService },
            },
            {
                component: SportCategoryListPageComponent,
                canActivate: [ngxPermissionsGuard],
                data: {
                    breadcrumb: 'List',
                    permissions: {
                        only: [
                            RoleNames.ADMIN,
                            SportCategoryAdminPermissionsService.viewSportCategoryListPage,
                        ],
                        redirectTo: '/error',
                    },
                },
                path: 'list',
                pathMatch: 'full',
                resolve: { data: SportCategoryListPageResolverService },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SportCategoryAdminPageRoutingModule {}
