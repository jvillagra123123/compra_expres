import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateLocalPageRoutingModule } from './create-local-routing.module';

import { CreateLocalPage } from './create-local.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateLocalPageRoutingModule
  ],
  declarations: [CreateLocalPage]
})
export class CreateLocalPageModule {}
