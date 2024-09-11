import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home-page.module').then(
        (module) => module.HomePageModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user-page.module').then(
        (module) => module.UserPageModule
      ),
  },
];

const routerOptions: ExtraOptions = {
  bindToComponentInputs: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
