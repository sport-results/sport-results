import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './component';

function createRoutes(): Routes {
  return [
    {
      path: '',
      component: AdminPageComponent,
      children: [
       
      ],
    },
  ];
}

const routes: Routes = createRoutes();

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
