import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
  piercingForm!: FormGroup;
  imagenSeleccionada: File | null = null;
  fb: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    // Simulación de datos de citas
    this.citas = [
      {
        cliente: 'Luis Troncoso',
        fecha: '2025-01-11',
        hora: '15:00',
        piercing: 'Aro de nariz',
      },
      {
        cliente: 'Patricio Rodríguez',
        fecha: '2025-01-12',
        hora: '16:30',
        piercing: 'Piercing en la ceja',
      },
    ];

    this.piercingForm = this.fb.group({
      nombre: ['', [Validators.required]],
      precio: [
        '',
        [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')],
      ],
    });
  }

  aceptarCita(cita: any) {
    this.showToast(`Cita aceptada para ${cita.cliente}.`);
    this.citas = this.citas.filter((c) => c !== cita); // Eliminar cita aceptada
  }

  rechazarCita(cita: any) {
    this.showToast(`Cita rechazada para ${cita.cliente}.`);
    this.citas = this.citas.filter((c) => c !== cita); // Eliminar cita rechazada
  }

  onFileSelected(event: any) {
    this.imagenSeleccionada = event.target.files[0] || null;
  }

  async agregarPiercing() {
    if (this.piercingForm.valid && this.imagenSeleccionada) {
      const nuevoPiercing = {
        nombre: this.piercingForm.value.nombre,
        precio: this.piercingForm.value.precio,
        imagen: this.imagenSeleccionada.name, // Solo simula el nombre de la imagen
      };

      // Aquí puedes guardar el piercing en la base de datos o una API
      console.log('Piercing agregado:', nuevoPiercing);

      this.showToast('Piercing agregado correctamente.');
      this.piercingForm.reset();
      this.imagenSeleccionada = null;
    } else {
      this.showToast(
        'Por favor completa todos los campos y selecciona una imagen.',
        'danger'
      );
    }
  }

  cerrarSesion() {
    this.router.navigate(['/login']); // Redirigir al login
    this.showToast('Sesión cerrada correctamente.', 'warning');
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
    });
    toast.present();
  }
}
