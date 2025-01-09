import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private navCtrl: NavController) {
    // Configuración del formulario reactivo
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo de correo con validaciones
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Mínimo 8 caracteres
          Validators.maxLength(20), // Máximo 20 caracteres
          Validators.pattern(/^[a-zA-Z0-9@#%!&*/]+$/), // Alfanuméricos + caracteres especiales permitidos
        ],
      ],
    });
  }

  // Maneja el inicio de sesión
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login exitoso:', email, password);
      // Aquí podrías llamar a un servicio de autenticación (AuthService) para verificar credenciales.
      // Ejemplo: this.authService.login(email, password).subscribe(...);
      this.navCtrl.navigateForward('/home'); // Redirige a la página principal (o donde corresponda)
    } else {
      console.log('Formulario inválido');
    }
  }

  // Navega a la página de registro
  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  // Navega a la página de recuperación de contraseña
  goToRecoverPassword() {
    this.navCtrl.navigateForward('/recover-password');
  }

  ngOnInit() {
    // Código adicional que quieras ejecutar al inicializar el componente
  }
}
