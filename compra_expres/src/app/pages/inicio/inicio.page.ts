import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements OnInit {
  selectedCategory: string = 'all';

  // Método para seleccionar la categoría
  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    this.loadMap();
  }

  // Método para cargar el mapa
  loadMap() {
    // Crear el script para cargar Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyChh93UNfEhNzwXxostDla2kuU1tBMXRv8`;
    script.async = true;
    script.defer = true;

    // Callback cuando el script se haya cargado
    script.onload = () => {
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: -33.4489, lng: -70.6693 }, // Coordenadas iniciales
        zoom: 12,
      });
    };

    document.body.appendChild(script);
  }
}
