import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalVerificationPage } from './local-verification.page';

const routes: Routes = [
  {
    path: '',
    component: LocalVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalVerificationPageRoutingModule {}
