
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportNetworkDataModule } from './data';
import { SportNetworkStoreModule } from './store';
import { SportNetworkUtilModule } from './util';

@NgModule({
    imports: [
        CommonModule,
        SportNetworkDataModule,
        SportNetworkStoreModule,
        SportNetworkUtilModule
    ],
})
export class SportNetworkModule {}