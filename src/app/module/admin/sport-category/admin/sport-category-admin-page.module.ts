import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  SportCategoryCollectionModule,
  SportCategoryFormModule,
} from '@app/domain/sport-category';
import { SportCategoryRuleFormModule } from '@app/domain/sport-category-rule';

import { SportCategoryAdminPageComponent } from './page/admin';
import {
  SportCategoryEditPageComponent,
  SportCategoryEditPageResolverService,
} from './page/edit';
import {
  SportCategoryListPageComponent,
  SportCategoryListPageResolverService,
} from './page/list';
import { SportCategoryAdminPageRoutingModule } from './sport-category-admin-page-routing.module';
import { SportCategoryRuleEditPageComponent } from './page/edit-rule';

@NgModule({
  declarations: [
    SportCategoryAdminPageComponent,
    SportCategoryEditPageComponent,
    SportCategoryListPageComponent,
    SportCategoryRuleEditPageComponent
  ],
  imports: [
    CommonModule,
    SportCategoryAdminPageRoutingModule,
    SportCategoryFormModule,
    SportCategoryCollectionModule,
    SportCategoryRuleFormModule,
    ButtonModule,
    NgxPermissionsModule,
    ToolbarModule,
  ],
  providers: [
    SportCategoryEditPageResolverService,
    SportCategoryListPageResolverService,
  ],
})
export class SportCategoryAdminPageModule {}
