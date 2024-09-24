
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportPlayerDataModule } from './data';
import { SportPlayerStoreModule } from './store';
import { SportPlayerUtilModule } from './util';

@NgModule({
    imports: [
        CommonModule,
        SportPlayerDataModule,
        SportPlayerStoreModule,
        SportPlayerUtilModule
    ],
})
export class SportPlayerModule {}