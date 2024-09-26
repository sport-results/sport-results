import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NetworkPlayerTableComponent } from './component';

@NgModule({
    declarations: [NetworkPlayerTableComponent],
    exports: [NetworkPlayerTableComponent],
    imports: [CommonModule, ButtonModule, NgxPermissionsModule, TableModule,],
})
export class NetworkPlayerCollectionModule {}
