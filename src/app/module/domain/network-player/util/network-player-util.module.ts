import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NetworkPlayerUtilService } from '@app/api/domain/network-player';

import { NetworkPlayerUtilServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: NetworkPlayerUtilService,
            useClass: NetworkPlayerUtilServiceImpl,
        },
    ],
})
export class NetworkPlayerUtilModule {}
