
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PermissionDataService } from '@app/api/domain/permission';

import { PermissionDataServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [
        {
            provide: PermissionDataService,
            useClass: PermissionDataServiceImpl,
        },
    ],
})
export class PermissionDataModule {}