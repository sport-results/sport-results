import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './component/user-page/user-page.component';
import { UserProfileComponent } from "../../module/domain/user/profile/component/user-profile/user-profile.component";


@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    UserProfileComponent
]
})
export class UserPageModule { }
