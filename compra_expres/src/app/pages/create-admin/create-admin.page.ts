import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.page.html',
  styleUrls: ['./create-admin.page.scss'],
  standalone: false,
})
export class CreateAdminPage implements OnInit {
  newCategory: string = ''; // Variable para almacenar el texto ingresado
  categories: string[] = []; // Arreglo para almacenar las categorías

  constructor() {}

  ngOnInit() {}

  // Método para añadir una nueva categoría
  addCategory() {
    if (this.newCategory.trim() !== '') {
      this.categories.push(this.newCategory.trim()); // Agregar la categoría al arreglo
      this.newCategory = ''; // Limpiar el input
    }
  }

  // Método para eliminar una categoría
  removeCategory(index: number) {
    this.categories.splice(index, 1); // Eliminar la categoría por índice
  }
}
