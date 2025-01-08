import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectProfilePage } from './select-profile.page';

const routes: Routes = [
  {
    path: '',
    component: SelectProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectProfilePageRoutingModule {}
