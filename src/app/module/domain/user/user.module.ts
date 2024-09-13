import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserDataModule } from './data';
import { UserStoreModule } from './store';
import { UserUtilModule } from './util';

@NgModule({
    imports: [CommonModule, UserDataModule, UserStoreModule, UserUtilModule],
})
export class UserModule {}
