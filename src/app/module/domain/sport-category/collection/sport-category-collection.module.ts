import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportCategoryTableComponent } from './component';

@NgModule({
    declarations: [SportCategoryTableComponent],
    exports: [SportCategoryTableComponent],
    imports: [CommonModule, ButtonModule, NgxPermissionsModule, TableModule,],
})
export class SportCategoryCollectionModule {}
