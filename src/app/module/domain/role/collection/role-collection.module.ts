import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RoleTableComponent } from './component';

@NgModule({
    declarations: [RoleTableComponent],
    exports: [RoleTableComponent],
    imports: [CommonModule, ButtonModule, TableModule, NgxPermissionsModule],
})
export class RoleCollectionModule {}
