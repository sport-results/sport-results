
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SportCategoryDataService } from '@app/api/domain/sport-category';

import { SportCategoryDataServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [
        {
            provide: SportCategoryDataService,
            useClass:SportCategoryDataServiceImpl,
        },
    ],
})
export class SportCategoryDataModule {}