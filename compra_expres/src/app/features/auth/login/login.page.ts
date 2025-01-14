import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importar el ToastController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(40),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
        ],
      ],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async iniciarSesion() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Credenciales de usuario normal
      const userEmail = 'lui.troncoso@duocuc.cl';
      const userPassword = 'Luis1234';

      // Credenciales de administrador
      const adminEmail = 'admin@duocuc.cl';
      const adminPassword = 'Admin1234';

      if (email === userEmail && password === userPassword) {
        this.errorMessage = '';
        await this.showToast('¡Inicio de sesión exitoso como usuario!');
        this.router.navigate(['/inicio']); // Cambiar a la página de inicio de usuario
      } else if (email === adminEmail && password === adminPassword) {
        this.errorMessage = '';
        await this.showToast('¡Inicio de sesión exitoso como administrador!');
        this.router.navigate(['/admin']); // Cambiar a la página de administrador
      } else {
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    } else {
      this.displayErrors();
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // El toast se mostrará por 2 segundos
      position: 'bottom',
      color: 'success', // Cambiar a 'danger' si es un mensaje de error
    });
    toast.present();
  }

  displayErrors() {
    const errors = this.loginForm.controls;
    if (errors['email'].errors) {
      if (errors['email'].errors['required']) {
        this.errorMessage = 'El correo es obligatorio.';
      } else if (errors['email'].errors['email']) {
        this.errorMessage = 'El formato del correo no es válido.';
      } else if (errors['email'].errors['maxlength']) {
        this.errorMessage = 'El correo no debe exceder 40 caracteres.';
      }
    } else if (errors['password'].errors) {
      if (errors['password'].errors['required']) {
        this.errorMessage = 'La contraseña es obligatoria.';
      } else if (errors['password'].errors['minlength']) {
        this.errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
      } else if (errors['password'].errors['maxlength']) {
        this.errorMessage = 'La contraseña no debe exceder 12 caracteres.';
      }
    }
  }
}
