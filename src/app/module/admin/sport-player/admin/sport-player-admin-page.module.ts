import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportPlayerCollectionModule, SportPlayerFormModule } from '@app/module/domain/sport-player';

import { SportPlayerAdminPageComponent } from './page/admin';
import {
    SportPlayerEditPageComponent,
    SportPlayerEditPageResolverService,
} from './page/edit';
import {
    SportPlayerListPageComponent,
    SportPlayerListPageResolverService,
} from './page/list';
import { SportPlayerAdminPageRoutingModule } from './sport-player-admin-page-routing.module';

@NgModule({
    declarations: [
        SportPlayerAdminPageComponent,
        SportPlayerEditPageComponent,
        SportPlayerListPageComponent,
    ],
    imports: [
        CommonModule,
        SportPlayerAdminPageRoutingModule,
        SportPlayerFormModule,
        SportPlayerCollectionModule,
        ButtonModule,
        NgxPermissionsModule,
        ToolbarModule
    ],
    providers: [SportPlayerEditPageResolverService, SportPlayerListPageResolverService],
})
export class SportPlayerAdminPageModule {}
