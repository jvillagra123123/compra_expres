import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalVerificationPageRoutingModule } from './local-verification-routing.module';

import { LocalVerificationPage } from './local-verification.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalVerificationPageRoutingModule,
    SharedModule
  ],
  declarations: [LocalVerificationPage]
})
export class LocalVerificationPageModule {}
