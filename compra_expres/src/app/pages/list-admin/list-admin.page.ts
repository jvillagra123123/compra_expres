import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.page.html',
  styleUrls: ['./list-admin.page.scss'],
  standalone: false,
 
})
export class ListAdminPage implements OnInit {

  // Lista de usuarios
  users = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: 2, name: 'Ana López', email: 'ana.lopez@example.com' },
    { id: 3, name: 'Carlos Méndez', email: 'carlos.mendez@example.com' },
  ];

  // Lista de locales
  locals = [
    { id: 1, name: 'Local A', address: 'Calle 123', stars: 4 },
    { id: 2, name: 'Local B', address: 'Avenida Principal', stars: 5 },
    { id: 3, name: 'Local C', address: 'Calle 456', stars: 3 },
  ];

  selectedItem: any = null;
  selectedType: string | null = null;

  constructor() {}

  ngOnInit() {}

  // Función para seleccionar un usuario o un local
  selectItem(item: any, type: string) {
    this.selectedItem = item;
    this.selectedType = type;
  }

  // Función para eliminar el usuario o local seleccionado
  deleteSelected() {
    if (!this.selectedItem || !this.selectedType) {
      return; // No hacer nada si no hay un ítem seleccionado
    }

    if (this.selectedType === 'user') {
      // Eliminar usuario
      this.users = this.users.filter(user => user.id !== this.selectedItem.id);
      console.log(`Usuario con ID ${this.selectedItem.id} eliminado`);
    } else if (this.selectedType === 'local') {
      // Eliminar local
      this.locals = this.locals.filter(local => local.id !== this.selectedItem.id);
      console.log(`Local con ID ${this.selectedItem.id} eliminado`);
    }

    // Restablecer selección después de la eliminación
    this.selectedItem = null;
    this.selectedType = null;
  }

  // Función para cancelar la selección
  cancelSelection() {
    this.selectedItem = null;
    this.selectedType = null;
  }
}
