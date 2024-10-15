import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    SportResultStoreService,
    SportResultEffectService,
    SPORT_RESULT_FEATURE_KEY
} from '@app/api/domain/sport-result';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SportResultEffectServiceImpl } from './state/sport-result-effect.service.impl';
import { SportResultStoreServiceImpl } from './state/sport-result-store.service.impl';
import { SportResultEffects } from './state/sport-result.effects';
import * as fromSportResult from './state/sport-result.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(SPORT_RESULT_FEATURE_KEY, fromSportResult.reducer),
        EffectsModule.forFeature([SportResultEffects]),
    ],
    providers: [
         {
            provide: SportResultEffectService,
            useClass: SportResultEffectServiceImpl,
        },
        {
            provide: SportResultStoreService,
            useClass: SportResultStoreServiceImpl,
        },
    ],
})
export class SportResultStoreModule {}
