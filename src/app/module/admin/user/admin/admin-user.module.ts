import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { AdminUserRoutingModule } from './admin-user-routing.module';
import { UserAdminPageComponent } from './page/admin';
import {
    UserEditPageComponent,
    UserEditPageResolverService,
} from './page/edit';
import {
    UserListPageComponent,
    UserListPageResolverService,
} from './page/list';
import { UserFormComponent, UserTableComponent } from '@app/domain/user';

@NgModule({
    declarations: [
        UserAdminPageComponent,
        UserEditPageComponent,
        UserListPageComponent,
    ],
    imports: [
        CommonModule,
        ButtonModule,
        NgxPermissionsModule,
        AdminUserRoutingModule,
        UserFormComponent,
        UserTableComponent,
        ToolbarModule,
    ],
    providers: [UserEditPageResolverService, UserListPageResolverService],
})
export class AdminUserModule {}
