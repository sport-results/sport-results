import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NetworkPlayerCollectionModule,
  NetworkPlayerFormModule,
} from '@app/domain/network-player';

import { NetworkPlayerAdminPageComponent } from './page/admin';
import {
  NetworkPlayerListPageComponent,
  NetworkPlayerListPageResolverService,
} from './page/list';
import { NetworkPlayerAdminPageRoutingModule } from './network-player-admin-page-routing.module';

@NgModule({
  declarations: [
    NetworkPlayerAdminPageComponent,
    NetworkPlayerListPageComponent,
  ],
  imports: [
    CommonModule,
    NetworkPlayerAdminPageRoutingModule,
    NetworkPlayerFormModule,
    NetworkPlayerCollectionModule,
    ButtonModule,
    NgxPermissionsModule,
    ToolbarModule,
  ],
  providers: [NetworkPlayerListPageResolverService],
})
export class NetworkPlayerAdminPageModule {}
