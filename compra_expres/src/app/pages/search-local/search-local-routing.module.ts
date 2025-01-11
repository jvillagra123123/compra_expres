import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchLocalPage } from './search-local.page';

const routes: Routes = [
  {
    path: '',
    component: SearchLocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchLocalPageRoutingModule {}
