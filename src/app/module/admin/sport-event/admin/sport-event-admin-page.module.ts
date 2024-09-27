import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  SportEventCollectionModule,
  SportEventFormModule,
} from '@app/domain/sport-event';

import { SportEventAdminPageComponent } from './page/admin';
import {
  SportEventListPageComponent,
  SportEventListPageResolverService,
} from './page/list';
import { SportEventAdminPageRoutingModule } from './sport-event-admin-page-routing.module';

@NgModule({
  declarations: [SportEventAdminPageComponent, SportEventListPageComponent],
  imports: [
    CommonModule,
    SportEventAdminPageRoutingModule,
    SportEventFormModule,
    SportEventCollectionModule,
    ButtonModule,
    NgxPermissionsModule,
    ToolbarModule,
  ],
  providers: [
    SportEventListPageResolverService,
  ],
})
export class SportEventAdminPageModule {}
