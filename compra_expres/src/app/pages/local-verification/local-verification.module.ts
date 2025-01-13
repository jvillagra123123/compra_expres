import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalVerificationPageRoutingModule } from './local-verification-routing.module';

import { LocalVerificationPage } from './local-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalVerificationPageRoutingModule
  ],
  declarations: [LocalVerificationPage]
})
export class LocalVerificationPageModule {}
