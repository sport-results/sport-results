import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPageComponent } from './component';
import { UserProfileComponent } from '@app/domain/user';
import { UserDashboardComponent } from '../../module/domain/user/dashboard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile',
      },
      {
        component: UserProfileComponent,
        path: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'network-player',
        loadChildren: () =>
          import('@app/domain/network-player').then(
            (module) => module.NetworkPlayerModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), UserProfileComponent],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
