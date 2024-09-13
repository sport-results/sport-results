import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserTableComponent } from './component';

@NgModule({
    declarations: [UserTableComponent],
    exports: [UserTableComponent],
    imports: [CommonModule, ButtonModule, TableModule, NgxPermissionsModule],
})
export class UserCollectionModule {}
