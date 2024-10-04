import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PermissionUtilService } from '@app/api/domain/permission';

import { PermissionUtilServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: PermissionUtilService,
            useClass: PermissionUtilServiceImpl,
        },
    ],
})
export class PermissionUtilModule {}
