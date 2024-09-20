
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SportNetworkDataService } from '@app/api/domain/sport-network';

import { SportNetworkDataServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [
        {
            provide: SportNetworkDataService,
            useClass: SportNetworkDataServiceImpl,
        },
    ],
})
export class SportNetworkDataModule {}