import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    SportCategoryStoreService,
    SportCategoryEffectService,
    SPORT_CATEGORY_FEATURE_KEY
} from '@app/api/domain/sport-category';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SportCategoryEffectServiceImpl } from './state/sport-category-effect.service.impl';
import { SportCategoryStoreServiceImpl } from './state/sport-category-store.service.impl';
import { SportCategoryEffects } from './state/sport-category.effects';
import * as fromSportCategory from './state/sport-category.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(SPORT_CATEGORY_FEATURE_KEY, fromSportCategory.reducer),
        EffectsModule.forFeature([SportCategoryEffects]),
    ],
    providers: [
         {
            provide: SportCategoryEffectService,
            useClass: SportCategoryEffectServiceImpl,
        },
        {
            provide: SportCategoryStoreService,
            useClass: SportCategoryStoreServiceImpl,
        },
    ],
})
export class SportCategoryStoreModule {}
