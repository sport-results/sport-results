import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    SportEventStoreService,
    SportEventEffectService,
    SPORT_EVENT_FEATURE_KEY
} from '@app/api/domain/sport-event';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SportEventEffectServiceImpl } from './state/sport-event-effect.service.impl';
import { SportEventStoreServiceImpl } from './state/sport-event-store.service.impl';
import { SportEventEffects } from './state/sport-event.effects';
import * as fromSportEvent from './state/sport-event.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(SPORT_EVENT_FEATURE_KEY, fromSportEvent.reducer),
        EffectsModule.forFeature([SportEventEffects]),
    ],
    providers: [
         {
            provide: SportEventEffectService,
            useClass: SportEventEffectServiceImpl,
        },
        {
            provide: SportEventStoreService,
            useClass: SportEventStoreServiceImpl,
        },
    ],
})
export class SportEventStoreModule {}
