import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserUtilService } from '@app/api/domain/user';

import { UserUtilServiceImpl } from './service/user-util.service.impl';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [
        {
            provide: UserUtilService,
            useClass: UserUtilServiceImpl,
        },
    ],
})
export class UserUtilModule {}
