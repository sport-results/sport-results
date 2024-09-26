
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NetworkPlayerDataModule } from './data';
import { NetworkPlayerStoreModule } from './store';
import { NetworkPlayerUtilModule } from './util';

@NgModule({
    imports: [
        CommonModule,
        NetworkPlayerDataModule,
        NetworkPlayerStoreModule,
        NetworkPlayerUtilModule
    ],
})
export class NetworkPlayerModule {}