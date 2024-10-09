
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportResultDataModule } from './data';
import { SportResultStoreModule } from './store';
import { SportResultUtilModule } from './util';

@NgModule({
    imports: [
        CommonModule,
        SportResultDataModule,
        SportResultStoreModule,
        SportResultUtilModule
    ],
})
export class SportResultModule {}