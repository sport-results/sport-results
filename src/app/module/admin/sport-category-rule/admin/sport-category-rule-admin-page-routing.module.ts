import { NgxPermissionsGuard } from 'ngx-permissions';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportCategoryRuleAdminPermissionsService } from '@app/api/admin/sport-category-rule';
import { RoleNames } from '@app/api/common';

import { SportCategoryRuleAdminPageComponent } from './page/admin';
import {
    SportCategoryRuleEditPageComponent,
    SportCategoryRuleEditPageResolverService,
} from './page/edit';
import {
    SportCategoryRuleListPageComponent,
    SportCategoryRuleListPageResolverService,
} from './page/list';

const routes: Routes = [
    {
        path: '',
        component: SportCategoryRuleAdminPageComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list',
            },
            {
                component: SportCategoryRuleEditPageComponent,
                canActivate: [NgxPermissionsGuard],
                path: 'edit/:sportCategoryRuleId',
                data: {
                    breadcrumb: 'Edit',
                    permissions: {
                        only: [
                            RoleNames.ADMIN,
                            SportCategoryRuleAdminPermissionsService.viewSportCategoryRuleEditPage,
                        ],
                        redirectTo: '/error',
                    },
                },
                pathMatch: 'full',
                resolve: { data: SportCategoryRuleEditPageResolverService },
            },
            {
                component: SportCategoryRuleListPageComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    breadcrumb: 'List',
                    permissions: {
                        only: [
                            RoleNames.ADMIN,
                            SportCategoryRuleAdminPermissionsService.viewSportCategoryRuleListPage,
                        ],
                        redirectTo: '/error',
                    },
                },
                path: 'list',
                pathMatch: 'full',
                resolve: { data: SportCategoryRuleListPageResolverService },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SportCategoryRuleAdminPageRoutingModule {}
