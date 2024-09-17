
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SportCategoryRuleDataService } from '@app/api/domain/sport-category-rule';

import { SportCategoryRuleDataServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [
        {
            provide: SportCategoryRuleDataService,
            useClass:SportCategoryRuleDataServiceImpl,
        },
    ],
})
export class SportCategoryRuleDataModule {}