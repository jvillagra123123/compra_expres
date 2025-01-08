import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageRegisterPageRoutingModule } from './message-register-routing.module';

import { MessageRegisterPage } from './message-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageRegisterPageRoutingModule
  ],
  declarations: [MessageRegisterPage]
})
export class MessageRegisterPageModule {}
