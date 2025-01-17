import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    // Simulación de datos de citas
    this.citas = [
      {
        Local: 'La chica ale',
        Direccion: 'pto barroso 681',
        Comentario: 'Excelente atención',
      },
      {
        Local: 'Lupita',
        Direccion: 'Calle 32',
        Comentario: 'Muy bueno',
      },
    ];

    // Ajuste: Usar `this.formBuilder` en lugar de `this.fb`
    this.piercingForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      precio: [
        '',
        [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')],
      ],
    });
  }

  aceptarCita(cita: any) {
    this.showToast(`Cita aceptada: ${cita.Local}.`);
    this.citas = this.citas.filter((c) => c !== cita); // Eliminar cita aceptada
  }

  rechazarCita(cita: any) {
    this.showToast(`Cita rechazada: ${cita.Local}.`);
    this.citas = this.citas.filter((c) => c !== cita); // Eliminar cita rechazada
  }

  onFileSelected(event: any) {
    this.imagenSeleccionada = event.target.files[0] || null;
  }

  async agregarPiercing() {
    if (this.piercingForm.valid && this.imagenSeleccionada) {
      const nuevoLocal = {
        Local: this.piercingForm.value.nombre,
        Direccion: this.piercingForm.value.direccion || 'Sin dirección',
        Comentario: 'Nuevo local añadido por el administrador.',
      };

      // Agregar el nuevo local al arreglo de citas
      this.citas.push(nuevoLocal);

      // Mensaje de confirmación
      this.showToast('Local agregado correctamente.');
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
      duration: 2000, // Ajustar duración del toast
      position: 'bottom',
      color,
    });
    toast.present();
  }
}
