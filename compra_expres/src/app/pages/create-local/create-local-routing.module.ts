import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLocalPage } from './create-local.page';

const routes: Routes = [
  {
    path: '',
    component: CreateLocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateLocalPageRoutingModule {}
