import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular'; // Agregar AlertController

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController  // Inyectar AlertController
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

  // Método para registrar al usuario
  async onRegister() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      console.log('Registro:', { firstName, lastName, email, password });

      // Muestra la alerta de éxito
      await this.showRegisterAlert();
    }
  }

  // Método para mostrar la alerta
  async showRegisterAlert() {
    const alert = await this.alertController.create({
      header: '¡Cuenta creada con éxito!',
      message: 'Tu cuenta se ha creado correctamente.',
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
