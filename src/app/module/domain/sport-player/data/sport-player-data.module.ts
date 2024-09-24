
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SportPlayerDataService } from '@app/api/domain/sport-player';

import { SportPlayerDataServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [
        {
            provide: SportPlayerDataService,
            useClass: SportPlayerDataServiceImpl,
        },
    ],
})
export class SportPlayerDataModule {}