
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportCategoryRuleDataModule } from './data';
import { SportCategoryRuleStoreModule } from './store';
import { SportCategoryRuleUtilModule } from './util';

@NgModule({
    imports: [CommonModule, SportCategoryRuleDataModule, SportCategoryRuleStoreModule, SportCategoryRuleUtilModule  ],
})
export class SportCategoryRuleModule {}