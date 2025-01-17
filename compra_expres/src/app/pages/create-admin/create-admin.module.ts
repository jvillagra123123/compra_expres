import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateAdminPageRoutingModule } from './create-admin-routing.module';
import { CreateAdminPage } from './create-admin.page';
import { SharedModule } from'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateAdminPageRoutingModule,
    SharedModule
  ],
  declarations: [CreateAdminPage]
})
export class CreateAdminPageModule {}
