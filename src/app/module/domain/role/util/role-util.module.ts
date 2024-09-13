import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleUtilService } from '@app/api/domain/role';

import { RoleUtilServiceImpl } from './service';

@NgModule({
    declarations: [],
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: RoleUtilService,
            useClass: RoleUtilServiceImpl,
        },
    ],
})
export class RoleUtilModule {}
