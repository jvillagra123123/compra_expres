import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importar el ToastController
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importar AngularFireAuth
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importar AngularFirestore

// Definir la interfaz para los datos del usuario
interface UserData {
  role: string; // Define que el campo `role` debe ser una cadena
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false, // Si no es standalone, mantenemos false
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private afAuth: AngularFireAuth, // Inyectar AngularFireAuth
    private firestore: AngularFirestore // Inyectar AngularFirestore
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
          Validators.minLength(6),
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

      try {
        // Autenticar usuario con Firebase Authentication
        const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (user) {
          // Consultar el rol del usuario desde Firestore
          const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
          const userData = userDoc?.data() as UserData; // Especificar el tipo de `userData`

          if (userData?.role === 'admin') {
            await this.showToast('¡Inicio de sesión exitoso como administrador!');
            this.router.navigate(['/admin']); // Cambiar a la página de administrador
          } else if (userData?.role === 'estandar') {
            await this.showToast('¡Inicio de sesión exitoso como usuario!');
            this.router.navigate(['/inicio']); // Cambiar a la página de usuario
          } else {
            this.errorMessage = 'No tienes asignado un rol válido.';
          }
        }
      } catch (error) {
        this.errorMessage = (error as any).message;
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
        this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      } else if (errors['password'].errors['maxlength']) {
        this.errorMessage = 'La contraseña no debe exceder 12 caracteres.';
      }
    }
  }
}
