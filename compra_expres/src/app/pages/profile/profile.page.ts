import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private navCtrl: NavController) {
    // Crear el formulario del perfil
    this.profileForm = this.fb.group({
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
    return password === confirmPassword? null : { notMatching: true };
  }
  // Editar el perfil
  onProfile() {
    if (this.profileForm.valid) {
      const { firstName, lastName, email, password } = this.profileForm.value;
      console.log('Perfil:', { firstName, lastName, email, password });
      // Llamar al servicio de editar perfil (AuthService)
      this.navCtrl.navigateForward('/inicio');
    }
  }

  

  ngOnInit() {
  }

}
