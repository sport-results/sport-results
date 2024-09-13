import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserDataService } from '@app/api/domain/user';

import { UserDataServiceImpl } from './services';

@NgModule({
    imports: [CommonModule],
    providers: [
        {
            provide: UserDataService,
            useClass: UserDataServiceImpl,
        },
    ],
})
export class UserDataModule {}
