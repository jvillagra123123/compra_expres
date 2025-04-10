import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements OnInit {
  selectedCategory: string = 'all';
  private map!: google.maps.Map; // Referencia al mapa

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
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBUzyOaxWwWh5rO5HGAS9eFsCpEuZQlD2g`;
    script.async = true;
    script.defer = true;

    // Callback cuando el script se haya cargado
    script.onload = () => {
      this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: -33.4489, lng: -70.6693 }, // Coordenadas iniciales
        zoom: 12,
      });
    };

    document.body.appendChild(script);
  }

  createLocal() {
    if (!navigator.geolocation) {
      alert('La geolocalización no está soportada en este navegador.');
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Obtenemos las coordenadas actuales del dispositivo
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
  
        console.log('Ubicación del usuario:', userLocation);
  
        // Centrar el mapa en la ubicación actual del dispositivo
        this.map.setCenter(userLocation);
  
        // Crear el marcador en la ubicación del dispositivo
        new google.maps.Marker({
          position: userLocation,
          map: this.map,
          title: 'Nuevo Local',
        });
  
        alert('Local creado correctamente en tu ubicación actual.');
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error);
        alert('No se pudo obtener tu ubicación. Por favor, verifica los permisos de geolocalización.');
      }
    );
  }
}