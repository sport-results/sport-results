import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPageComponent } from './component';
import { UserProfileComponent } from '@app/domain/user';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), UserProfileComponent],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
