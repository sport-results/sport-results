import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RoleCollectionModule } from '../collection/role-collection.module';
import { RoleFormModule } from '../form/role-form.module';
import { RoleModule } from '../role.module';
import { RoleAdminPageComponent } from './page/admin';
import {
    RoleEditPageComponent,
    RoleEditPageResolverService,
} from './page/edit';
import {
    RoleListPageComponent,
    RoleListPageResolverService,
} from './page/list';
import { RoleAdminPageRoutingModule } from './role-admin-page-routing.module';

@NgModule({
    declarations: [
        RoleAdminPageComponent,
        RoleEditPageComponent,
        RoleListPageComponent,
    ],
    imports: [
        CommonModule,
        ButtonModule,
        NgxPermissionsModule,
        RoleAdminPageRoutingModule,
        RoleFormModule,
        RoleCollectionModule,
        RoleModule,
        ToolbarModule,
    ],
    providers: [RoleEditPageResolverService, RoleListPageResolverService],
})
export class RoleAdminPageModule {}
