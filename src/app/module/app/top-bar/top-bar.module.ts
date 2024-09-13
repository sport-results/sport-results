import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';

import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfileModule } from '@app/domain/user';

import { CoreApplicationViewModule } from '../../core/application/view';
import { TopBarComponent } from './component';

@NgModule({
  exports: [TopBarComponent],
  declarations: [TopBarComponent],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    MenubarModule,
    NgOptimizedImage,
    ToolbarModule,
    UserProfileModule,
    CoreApplicationViewModule,
    DropdownModule,
  ],
})
export class TopBarModule {}
