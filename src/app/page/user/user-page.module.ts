import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './component/user-page/user-page.component';
import { UserProfileComponent } from '@app/domain/user';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    UserProfileComponent,
    MenuModule,
  ],
})
export class UserPageModule {}
