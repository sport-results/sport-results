
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PermissionDataModule } from './data';
import { PermissionStoreModule } from './store';
import { PermissionUtilModule } from './util';

@NgModule({
    imports: [
        CommonModule,
        PermissionDataModule,
        PermissionStoreModule,
        PermissionUtilModule
    ],
})
export class PermissionModule {}