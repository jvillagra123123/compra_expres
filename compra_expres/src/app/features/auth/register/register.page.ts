import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service'; // Ajusta las rutas relativas


@Component({
  standalone: false, // Esto indica que el componente es independiente
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController,
    private authService: AuthService // Inyectar AuthService
  ) {
    // Crear el formulario de registro
    this.registerForm = this.fb.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
        ],
        lastName: [
          '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%!&/])[A-Za-z\d@#%!&/]+$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // Validador para confirmar contraseñas
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  // Método para registrar al usuario usando Firebase
  async onRegister() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;

      try {
        // Llamar al servicio de autenticación
        await this.authService.signUp(firstName, lastName, email, password);

        // Mostrar la alerta de éxito
        await this.showRegisterAlert();

        // Navegar al login después del registro exitoso
        this.goToLogin();
      } catch (error) {
        // Manejo de errores de Firebase
        this.showErrorAlert((error as any).message);
      }
    }
  }

  // Método para mostrar la alerta de éxito
  async showRegisterAlert() {
    const alert = await this.alertController.create({
      header: '¡Cuenta creada con éxito!',
      message: 'Tu cuenta se ha creado correctamente.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Método para mostrar errores
  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error en el registro',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Navegar a la página de login
  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }

  ngOnInit() {}
}
