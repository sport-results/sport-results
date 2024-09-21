import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    SportNetworkStoreService,
    SportNetworkEffectService,
    SPORT_NETWORK_FEATURE_KEY
} from '@app/api/domain/sport-network';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SportNetworkEffectServiceImpl } from './state/sport-network-effect.service.impl';
import { SportNetworkStoreServiceImpl } from './state/sport-network-store.service.impl';
import { SportNetworkEffects } from './state/sport-network.effects';
import * as fromSportNetwork from './state/sport-network.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(SPORT_NETWORK_FEATURE_KEY, fromSportNetwork.reducer),
        EffectsModule.forFeature([SportNetworkEffects]),
    ],
    providers: [
         {
            provide: SportNetworkEffectService,
            useClass: SportNetworkEffectServiceImpl,
        },
        {
            provide: SportNetworkStoreService,
            useClass: SportNetworkStoreServiceImpl,
        },
    ],
})
export class SportNetworkStoreModule {}
