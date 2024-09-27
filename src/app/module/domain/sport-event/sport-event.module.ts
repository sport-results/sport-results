
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportEventDataModule } from './data';
import { SportEventStoreModule } from './store';
import { SportEventUtilModule } from './util';

@NgModule({
    imports: [
        CommonModule,
        SportEventDataModule,
        SportEventStoreModule,
        SportEventUtilModule
    ],
})
export class SportEventModule {}