import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  USER_FEATURE_KEY,
  UserEffectService,
  UserStoreService,
} from '@app/api/domain/user';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserEffects } from './state/user.effects';
import * as fromUser from './state/user.reducer';
import { UserEffectServiceImpl, UserStoreServiceImpl } from './service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_FEATURE_KEY, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [
    {
      provide: UserEffectService,
      useClass: UserEffectServiceImpl,
    },
    {
      provide: UserStoreService,
      useClass: UserStoreServiceImpl,
    },
  ],
})
export class UserStoreModule {}
