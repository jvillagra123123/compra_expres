import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchLocalPageRoutingModule } from './search-local-routing.module';

import { SearchLocalPage } from './search-local.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchLocalPageRoutingModule,
    SharedModule,
  ],
  declarations: [SearchLocalPage]
})
export class SearchLocalPageModule {}
