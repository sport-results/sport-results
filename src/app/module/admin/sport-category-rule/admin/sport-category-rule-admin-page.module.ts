import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  SportCategoryRuleCollectionModule,
  SportCategoryRuleFormModule,
} from '@app/domain/sport-category-rule';

import { SportCategoryRuleAdminPageComponent } from './page/admin';
import {
  SportCategoryRuleEditPageComponent,
  SportCategoryRuleEditPageResolverService,
} from './page/edit';
import {
  SportCategoryRuleListPageComponent,
  SportCategoryRuleListPageResolverService,
} from './page/list';
import { SportCategoryRuleAdminPageRoutingModule } from './sport-category-rule-admin-page-routing.module';

@NgModule({
  declarations: [
    SportCategoryRuleAdminPageComponent,
    SportCategoryRuleEditPageComponent,
    SportCategoryRuleListPageComponent,
  ],
  imports: [
    CommonModule,
    SportCategoryRuleAdminPageRoutingModule,
    SportCategoryRuleFormModule,
    SportCategoryRuleCollectionModule,
    ButtonModule,
    NgxPermissionsModule,
    ToolbarModule,
  ],
  providers: [
    SportCategoryRuleEditPageResolverService,
    SportCategoryRuleListPageResolverService,
  ],
})
export class SportCategoryRuleAdminPageModule {}
