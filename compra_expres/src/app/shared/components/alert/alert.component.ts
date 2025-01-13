import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';  // Importa AlertController
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: false,
})
export class AlertComponent {
  public alertButtons = [
    {
      text: 'Enviar Reporte',
      handler: () => {
        // Primero mostramos la alerta de éxito
        this.showSuccessAlert();
      }
    }
  ];

  public alertInputs = [
    {
      type: 'textarea',
      placeholder: 'Motivo del Reporte',
    },
  ];

  constructor(
    private alertController: AlertController,  // Inyecta AlertController
    private navCtrl: NavController
  ) {}

  // Función para mostrar la alerta de éxito
  async showSuccessAlert() {
    const successAlert = await this.alertController.create({
      header: '¡Reporte Enviado!',
      message: 'Tu reporte ha sido enviado con éxito.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.redirectToHome();  // Redirige a la página de inicio
          }
        }
      ]
    });

    // Mostrar la segunda alerta (confirmación de éxito)
    await successAlert.present();
  }

  // Redirigir a la página de inicio
  redirectToHome() {
    this.navCtrl.navigateRoot('/inicio');
  }
}
