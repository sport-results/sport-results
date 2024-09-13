import { NgModule } from '@angular/core';

import { RoleDataModule } from './data';
import { RoleStoreModule } from './store';
import { RoleUtilModule } from './util';

@NgModule({
    imports: [RoleDataModule, RoleStoreModule, RoleUtilModule],
})
export class RoleModule {}
