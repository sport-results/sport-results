import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportResultCollectionModule, SportResultFormModule } from '@app/module/domain/sport-result';

import { SportResultAdminPageComponent } from './page/admin';
import {
    SportResultEditPageComponent,
    SportResultEditPageResolverService,
} from './page/edit';
import {
    SportResultListPageComponent,
    SportResultListPageResolverService,
} from './page/list';
import { SportResultAdminPageRoutingModule } from './sport-result-admin-page-routing.module';

@NgModule({
    declarations: [
        SportResultAdminPageComponent,
        SportResultEditPageComponent,
        SportResultListPageComponent,
    ],
    imports: [
        CommonModule,
        SportResultAdminPageRoutingModule,
        SportResultFormModule,
        SportResultCollectionModule,
        ButtonModule,
        NgxPermissionsModule,
        ToolbarModule
    ],
    providers: [SportResultEditPageResolverService, SportResultListPageResolverService],
})
export class SportResultAdminPageModule {}
