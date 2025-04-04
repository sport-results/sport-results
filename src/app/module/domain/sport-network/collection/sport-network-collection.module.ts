import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportNetworkTableComponent } from './component';

@NgModule({
    declarations: [SportNetworkTableComponent],
    exports: [SportNetworkTableComponent],
    imports: [CommonModule, ButtonModule, NgxPermissionsModule, TableModule,],
})
export class SportNetworkCollectionModule {}
