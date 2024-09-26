
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NetworkPlayerDataService } from '@app/api/domain/network-player';

import { NetworkPlayerDataServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [
        {
            provide: NetworkPlayerDataService,
            useClass: NetworkPlayerDataServiceImpl,
        },
    ],
})
export class NetworkPlayerDataModule {}