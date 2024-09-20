import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportNetworkCollectionModule, SportNetworkFormModule } from '@app/module/domain/sport-network';

import { SportNetworkAdminPageComponent } from './page/admin';
import {
    SportNetworkEditPageComponent,
    SportNetworkEditPageResolverService,
} from './page/edit';
import {
    SportNetworkListPageComponent,
    SportNetworkListPageResolverService,
} from './page/list';
import { SportNetworkAdminPageRoutingModule } from './sport-network-admin-page-routing.module';

@NgModule({
    declarations: [
        SportNetworkAdminPageComponent,
        SportNetworkEditPageComponent,
        SportNetworkListPageComponent,
    ],
    imports: [
        CommonModule,
        SportNetworkAdminPageRoutingModule,
        SportNetworkFormModule,
        SportNetworkCollectionModule,
        ButtonModule,
        NgxPermissionsModule,
        ToolbarModule
    ],
    providers: [SportNetworkEditPageResolverService, SportNetworkListPageResolverService],
})
export class SportNetworkAdminPageModule {}
