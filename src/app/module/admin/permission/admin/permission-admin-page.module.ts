import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PermissionCollectionModule, PermissionFormModule } from '@app/module/domain/permission';

import { PermissionAdminPageComponent } from './page/admin';
import {
    PermissionEditPageComponent,
    PermissionEditPageResolverService,
} from './page/edit';
import {
    PermissionListPageComponent,
    PermissionListPageResolverService,
} from './page/list';
import { PermissionAdminPageRoutingModule } from './permission-admin-page-routing.module';

@NgModule({
    declarations: [
        PermissionAdminPageComponent,
        PermissionEditPageComponent,
        PermissionListPageComponent,
    ],
    imports: [
        CommonModule,
        PermissionAdminPageRoutingModule,
        PermissionFormModule,
        PermissionCollectionModule,
        ButtonModule,
        NgxPermissionsModule,
        ToolbarModule
    ],
    providers: [PermissionEditPageResolverService, PermissionListPageResolverService],
})
export class PermissionAdminPageModule {}
