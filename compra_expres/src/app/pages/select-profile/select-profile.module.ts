import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectProfilePageRoutingModule } from './select-profile-routing.module';

import { SelectProfilePage } from './select-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectProfilePageRoutingModule
  ],
  declarations: [SelectProfilePage]
})
export class SelectProfilePageModule {}
