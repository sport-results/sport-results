import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    ROLE_FEATURE_KEY,
    RoleEffectService,
    RoleStoreService,
} from '@app/api/domain/role';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RoleEffectServiceImpl } from './state/role-effect.service.impl';
import { RoleStoreServiceImpl } from './state/role-store.service.impl';
import { RoleEffects } from './state/role.effects';
import * as fromRole from './state/role.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(ROLE_FEATURE_KEY, fromRole.reducer),
        EffectsModule.forFeature([RoleEffects]),
    ],
    providers: [
        {
            provide: RoleEffectService,
            useClass: RoleEffectServiceImpl,
        },
        {
            provide: RoleStoreService,
            useClass: RoleStoreServiceImpl,
        },
    ],
})
export class RoleStoreModule {}
