import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportEventTableComponent } from './component';

@NgModule({
    declarations: [SportEventTableComponent],
    exports: [SportEventTableComponent],
    imports: [CommonModule, ButtonModule, NgxPermissionsModule, TableModule,],
})
export class SportEventCollectionModule {}
