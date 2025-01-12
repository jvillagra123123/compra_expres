import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';

import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    SharedModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {
  // Variable que almacena la categoría seleccionada
  selectedCategory: string = 'all';  // 'all' es la opción por defecto

  // Función para cambiar la categoría seleccionada
  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}




