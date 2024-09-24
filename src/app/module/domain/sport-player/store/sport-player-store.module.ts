import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    SportPlayerStoreService,
    SportPlayerEffectService,
    SPORT_PLAYER_FEATURE_KEY
} from '@app/api/domain/sport-player';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SportPlayerEffectServiceImpl } from './state/sport-player-effect.service.impl';
import { SportPlayerStoreServiceImpl } from './state/sport-player-store.service.impl';
import { SportPlayerEffects } from './state/sport-player.effects';
import * as fromSportPlayer from './state/sport-player.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(SPORT_PLAYER_FEATURE_KEY, fromSportPlayer.reducer),
        EffectsModule.forFeature([SportPlayerEffects]),
    ],
    providers: [
         {
            provide: SportPlayerEffectService,
            useClass: SportPlayerEffectServiceImpl,
        },
        {
            provide: SportPlayerStoreService,
            useClass: SportPlayerStoreServiceImpl,
        },
    ],
})
export class SportPlayerStoreModule {}
