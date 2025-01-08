import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageRegisterPage } from './message-register.page';

const routes: Routes = [
  {
    path: '',
    component: MessageRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageRegisterPageRoutingModule {}
