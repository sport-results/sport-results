import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportCategoryRuleTableComponent } from './component';

@NgModule({
    declarations: [SportCategoryRuleTableComponent],
    exports: [SportCategoryRuleTableComponent],
    imports: [CommonModule, ButtonModule, NgxPermissionsModule, TableModule,],
})
export class SportCategoryRuleCollectionModule {}
