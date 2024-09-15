import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SportCategoryUtilService } from '@app/api/domain/sport-category';

import { SportCategoryUtilServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: SportCategoryUtilService,
            useClass: SportCategoryUtilServiceImpl,
        },
    ],
})
export class SportCategoryUtilModule {}
