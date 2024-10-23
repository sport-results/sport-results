import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NetworkPlayerStoreService,
  NetworkPlayerEffectService,
  NETWORK_PLAYER_FEATURE_KEY,
} from '@app/api/domain/network-player';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NetworkPlayerEffects } from './state/network-player.effects';
import * as fromNetworkPlayer from './state/network-player.reducer';
import {
  NetworkPlayerEffectServiceImpl,
  NetworkPlayerStoreServiceImpl,
} from './service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      NETWORK_PLAYER_FEATURE_KEY,
      fromNetworkPlayer.reducer
    ),
    EffectsModule.forFeature([NetworkPlayerEffects]),
  ],
  providers: [
    {
      provide: NetworkPlayerEffectService,
      useClass: NetworkPlayerEffectServiceImpl,
    },
    {
      provide: NetworkPlayerStoreService,
      useClass: NetworkPlayerStoreServiceImpl,
    },
  ],
})
export class NetworkPlayerStoreModule {}
