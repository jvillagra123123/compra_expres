import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false,
})
export class AdminPage implements OnInit {
  citas: any[] = []; // Simulación de citas solicitadas por clientes

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    // Simulación de datos de citas
    this.citas = [
      {
        Local: 'La chica ale',
        Direccion: 'Providencia 324',
        Comentario: 'Excelente atención',
        estrella: 4, // Estrellas
      },
      {
        Local: 'Los mejores completos',
        Direccion: 'Santiago Centro 128',
        Comentario: 'Muy profesional',
        estrella: 5,
      },
      {
        Local: 'Donde las dulces',
        Direccion: 'Las Condes 525',
        Comentario: 'Buen servicio',
        estrella: 3,
      },
      {
        Local: 'Donde las dulces',
        Direccion: 'Las Condes 525',
        Comentario: 'Buen servicio',
        estrella: 3,
      },
      {
        Local: 'Donde las dulces',
        Direccion: 'Las Condes 525',
        Comentario: 'Buen servicio',
        estrella: 3,
      },
      {
        Local: 'Donde las dulces',
        Direccion: 'Las Condes 525',
        Comentario: 'Buen servicio',
        estrella: 3,
      },
      {
        Local: 'Donde las dulces',
        Direccion: 'Las Condes 525',
        Comentario: 'Buen servicio',
        estrella: 3,
      },
      {
        Local: 'Donde las dulces',
        Direccion: 'Las Condes 525',
        Comentario: 'Buen servicio',
        estrella: 3,
      },
      {
        Local: 'Donde las dulces',
        Direccion: 'Las Condes 525',
        Comentario: 'Buen servicio',
        estrella: 3,
      },
      // Más citas...
    ];
  }

  aceptarCita(cita: any) {
    cita.estado = 'aceptado'; // Cambiar estado de la cita a aceptada
    this.showToast(`Local ${cita.Local} aceptado.`, 'success');
    // Eliminar la cita aceptada de la lista
    this.citas = this.citas.filter((c) => c !== cita);
  }

  rechazarCita(cita: any) {
    cita.estado = 'rechazado'; // Cambiar estado de la cita a rechazada
    this.showToast(`Local ${cita.Local} rechazado.`, 'danger');
    // Eliminar la cita rechazada de la lista
    this.citas = this.citas.filter((c) => c !== cita);
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }
}
