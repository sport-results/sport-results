import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SportCategoryDataModule } from './data';
import { SportCategoryStoreModule } from './store';
import { SportCategoryUtilModule } from './util';

@NgModule({
  imports: [
    CommonModule,
    SportCategoryDataModule,
    SportCategoryStoreModule,
    SportCategoryUtilModule,
  ],
})
export class SportCategoryModule {}
