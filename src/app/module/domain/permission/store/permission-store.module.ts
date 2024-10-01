import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    PermissionStoreService,
    PermissionEffectService,
    PERMISSION_FEATURE_KEY
} from '@app/api/domain/permission';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PermissionEffectServiceImpl } from './state/permission-effect.service.impl';
import { PermissionStoreServiceImpl } from './state/permission-store.service.impl';
import { PermissionEffects } from './state/permission.effects';
import * as fromPermission from './state/permission.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(PERMISSION_FEATURE_KEY, fromPermission.reducer),
        EffectsModule.forFeature([PermissionEffects]),
    ],
    providers: [
         {
            provide: PermissionEffectService,
            useClass: PermissionEffectServiceImpl,
        },
        {
            provide: PermissionStoreService,
            useClass: PermissionStoreServiceImpl,
        },
    ],
})
export class PermissionStoreModule {}
