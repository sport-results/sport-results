import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportCategoryCollectionModule, SportCategoryFormModule } from '@app/module/domain/sport-category';

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

@NgModule({
    declarations: [
        SportCategoryAdminPageComponent,
        SportCategoryEditPageComponent,
        SportCategoryListPageComponent,
    ],
    imports: [
        CommonModule,
        SportCategoryAdminPageRoutingModule,
        SportCategoryFormModule,
        SportCategoryCollectionModule,
        ButtonModule,
        NgxPermissionsModule,
        ToolbarModule
    ],
    providers: [SportCategoryEditPageResolverService, SportCategoryListPageResolverService],
})
export class SportCategoryAdminPageModule {}
