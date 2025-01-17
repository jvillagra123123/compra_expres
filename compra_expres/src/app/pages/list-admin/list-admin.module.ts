import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListAdminPageRoutingModule } from './list-admin-routing.module';
import { ListAdminPage } from './list-admin.page';
import { SharedModule } from'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ListAdminPageRoutingModule,
    SharedModule
  ],
  declarations: [ListAdminPage]
})
export class ListAdminPageModule {}
