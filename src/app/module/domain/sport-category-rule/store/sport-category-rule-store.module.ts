import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    SportCategoryRuleStoreService,
    SportCategoryRuleEffectService,
    SPORT_CATEGORY_RULE_FEATURE_KEY
} from '@app/api/domain/sport-category-rule';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SportCategoryRuleEffectServiceImpl } from './state/sport-category-rule-effect.service.impl';
import { SportCategoryRuleStoreServiceImpl } from './state/sport-category-rule-store.service.impl';
import { SportCategoryRuleEffects } from './state/sport-category-rule.effects';
import * as fromSportCategoryRule from './state/sport-category-rule.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(SPORT_CATEGORY_RULE_FEATURE_KEY, fromSportCategoryRule.reducer),
        EffectsModule.forFeature([SportCategoryRuleEffects]),
    ],
    providers: [
         {
            provide: SportCategoryRuleEffectService,
            useClass: SportCategoryRuleEffectServiceImpl,
        },
        {
            provide: SportCategoryRuleStoreService,
            useClass: SportCategoryRuleStoreServiceImpl,
        },
    ],
})
export class SportCategoryRuleStoreModule {}
