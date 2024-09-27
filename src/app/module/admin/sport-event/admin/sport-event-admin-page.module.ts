import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportEventCollectionModule, SportEventFormModule } from '@app/module/domain/sport-event';

import { SportEventAdminPageComponent } from './page/admin';
import {
    SportEventEditPageComponent,
    SportEventEditPageResolverService,
} from './page/edit';
import {
    SportEventListPageComponent,
    SportEventListPageResolverService,
} from './page/list';
import { SportEventAdminPageRoutingModule } from './sport-event-admin-page-routing.module';

@NgModule({
    declarations: [
        SportEventAdminPageComponent,
        SportEventEditPageComponent,
        SportEventListPageComponent,
    ],
    imports: [
        CommonModule,
        SportEventAdminPageRoutingModule,
        SportEventFormModule,
        SportEventCollectionModule,
        ButtonModule,
        NgxPermissionsModule,
        ToolbarModule
    ],
    providers: [SportEventEditPageResolverService, SportEventListPageResolverService],
})
export class SportEventAdminPageModule {}
