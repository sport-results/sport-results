import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SportCategoryRuleUtilService } from '@app/api/domain/sport-category-rule';

import { SportCategoryRuleUtilServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: SportCategoryRuleUtilService,
            useClass: SportCategoryRuleUtilServiceImpl,
        },
    ],
})
export class SportCategoryRuleUtilModule {}
