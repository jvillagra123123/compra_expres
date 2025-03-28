import { Component, OnInit } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: false,
})
export class SearchComponent implements OnInit {
  // Data actualizada con comidas (objetos en lugar de strings)
  public data = [
    { nombre: 'Doña Clara', comidas: ['empanadas', 'papas fritas', 'helado'] },
    { nombre: 'Donde Raul', comidas: ['pizza', 'hamburguesa', 'papas'] },
    { nombre: 'Delicias!!!!', comidas: ['sushi', 'ensalada'] },
    { nombre: 'DeSabores', comidas: ['tacos', 'burritos'] },
    { nombre: 'DalDog', comidas: ['hot dogs', 'papas'] },
    { nombre: 'DGregori', comidas: ['pasta', 'lasaña'] },
  ];
  public results: any[] = [...this.data]; // Inicialmente muestra todos los locales

  // Función de búsqueda combinada (nombre + comidas)
  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';

    if (!query.trim()) {
      this.results = [...this.data]; // Si no hay query, muestra todos
      return;
    }

    this.results = this.data.filter(local => 
      local.nombre.toLowerCase().includes(query) || 
      local.comidas.some(comida => comida.toLowerCase().includes(query))
    );
  }

  constructor() { }
  ngOnInit() {}
}