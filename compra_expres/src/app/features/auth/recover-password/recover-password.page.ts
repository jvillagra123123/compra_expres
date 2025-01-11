import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
  standalone: false,
})
export class RecoverPasswordPage implements OnInit {
  email = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  async onRecoverPassword() {
    try {
      alert('Correo enviado. Revisa tu bandeja de entrada.');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

}
