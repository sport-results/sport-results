import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RoleDataService } from '@app/api/domain/role';

import { RoleDataServiceImpl } from './service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [
        {
            provide: RoleDataService,
            useClass: RoleDataServiceImpl,
        },
    ],
})
export class RoleDataModule {}
