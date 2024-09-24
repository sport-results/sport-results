import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportPlayerTableComponent } from './component';

@NgModule({
    declarations: [SportPlayerTableComponent],
    exports: [SportPlayerTableComponent],
    imports: [CommonModule, ButtonModule, NgxPermissionsModule, TableModule,],
})
export class SportPlayerCollectionModule {}
