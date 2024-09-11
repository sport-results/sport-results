import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPageComponent } from './component';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
