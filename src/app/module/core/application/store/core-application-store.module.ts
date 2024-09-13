import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ApplicationEffects, ApplicationStoreServiceImpl } from './state';
import * as fromApplication from './state/application.reducer';
import {
  APPLICATION_FEATURE_KEY,
  ApplicationStoreService,
} from '@app/api/core/application';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      APPLICATION_FEATURE_KEY,
      fromApplication.applicationReducer
    ),
    EffectsModule.forFeature([ApplicationEffects]),
  ],
  providers: [
    {
      provide: ApplicationStoreService,
      useClass: ApplicationStoreServiceImpl,
    },
  ],
})
export class CoreApplicationStoreModule {}
