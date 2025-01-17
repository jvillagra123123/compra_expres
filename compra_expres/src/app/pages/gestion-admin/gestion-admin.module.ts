import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GestionAdminPageRoutingModule } from './gestion-admin-routing.module';
import { GestionAdminPage } from './gestion-admin.page';
import { SharedModule } from'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionAdminPageRoutingModule,
    SharedModule
  ],
  declarations: [GestionAdminPage]
})
export class GestionAdminPageModule {}
