import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { USER_FEATURE_KEY, UserEffectService, UserStoreService } from '@app/api/domain/user';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserEffectServiceImpl } from './service/user-effect.service.impl';
import { UserStoreServiceImpl } from './service/user-store.service.impl';
import { UserEffects } from './service/user.effects';
import * as fromUser from './service/user.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(USER_FEATURE_KEY, fromUser.reducer),
        EffectsModule.forFeature([UserEffects]),
    ],
    providers: [
        {
            provide: UserEffectService,
            useClass: UserEffectServiceImpl
        },
        {
            provide: UserStoreService,
            useClass: UserStoreServiceImpl,
        },
    ],
})
export class UserStoreModule {}
