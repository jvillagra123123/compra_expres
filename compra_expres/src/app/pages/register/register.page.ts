import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private navCtrl: NavController) {
    // Crear el formulario de registro
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  // Validador para confirmar contraseñas
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  // Método para registrar al usuario
  onRegister() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      console.log('Registro:', { firstName, lastName, email, password });
      // Llamar al servicio de registro (AuthService)
      this.navCtrl.navigateForward('/select-profile');
    }
  }

  // Navegar a la pagina de login
  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }

   // Navegar a la pagina de select-profile
   goToSelectProfile(){
    this.navCtrl.navigateForward('/select-profile');
   }

  ngOnInit() {
  }

}
