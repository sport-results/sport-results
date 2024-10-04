import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPageComponent } from './component';
import { UserProfileComponent } from '@app/domain/user';
import { UserDashboardComponent } from '../../module/domain/user/dashboard';

const routes: Routes = [
  {
    path: '',
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
        component: UserDashboardComponent,
        path: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: ':sportNetworkId/network-player/edit/:networkPlayerId',
        pathMatch: 'full',
        loadComponent: () =>
          import('@app/admin/network-player').then(
            (module) => module.NetworkPlayerEditPageComponent
          ),
        data: {
          backUrl: '../../../../',
        },
      },
      {
        path: ':sportNetworkId/sport-event/edit/:sportEventId',
        pathMatch: 'full',
        loadComponent: () =>
          import('@app/admin/sport-event').then(
            (module) => module.SportEventEditPageComponent
          ),
        data: {
          backUrl: '../../../../',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), UserProfileComponent],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
