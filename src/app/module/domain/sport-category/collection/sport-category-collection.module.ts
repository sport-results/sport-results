import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  SportCategoryExpandableTableComponent,
  SportCategoryTableComponent,
} from './component';
import {
  SportCategoryRuleCollectionModule,
} from '@app/domain/sport-category-rule';

@NgModule({
  declarations: [
    SportCategoryTableComponent,
    SportCategoryExpandableTableComponent,
  ],
  exports: [SportCategoryTableComponent, SportCategoryExpandableTableComponent],
  imports: [
    CommonModule,
    ButtonModule,
    NgxPermissionsModule,
    TableModule,
    SportCategoryRuleCollectionModule,
  ],
})
export class SportCategoryCollectionModule {}
