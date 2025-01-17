import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  profileForm!: FormGroup;
  userId: string | null = null; // Almacena el ID del usuario autenticado
  userPhoto: string = '/assets/images.jpg'; // Foto de perfil predeterminada

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadUserData(); // Cargar la información del usuario al cargar la página
  }

  // Inicializar el formulario de perfil
  initializeForm() {
    this.profileForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [{ value: '', disabled: true }], // Campo deshabilitado para no permitir edición
        photoURL: [''], // Para almacenar la URL de la foto
        password: [
          '',
          [
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/),
          ],
        ],
        confirmPassword: [''], // Confirmar la contraseña
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // Validador para confirmar contraseñas
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword
      ? null
      : { notMatching: true };
  }

  // Cargar datos del usuario desde Firebase
  async loadUserData() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.userId = user.uid;

      // Obtener información del usuario desde Firestore
      this.firestore
        .collection('users')
        .doc(this.userId)
        .valueChanges()
        .subscribe((userData: any) => {
          if (userData) {
            // Cargar los datos en el formulario
            this.profileForm.patchValue({
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: user.email, // Correo del usuario autenticado
              photoURL: userData.photoURL || this.userPhoto, // Foto del usuario
            });
            this.userPhoto = userData.photoURL || this.userPhoto;
          }
        });
    }
  }

  // Guardar cambios en el perfil
  async saveProfile() {
    if (this.profileForm.valid && this.userId) {
      const { firstName, lastName, photoURL, password } = this.profileForm.value;

      // Actualizar la información del usuario en Firestore
      await this.firestore
        .collection('users')
        .doc(this.userId)
        .update({ firstName, lastName, photoURL });

      // Si hay una contraseña nueva, actualízala
      if (password) {
        const user = await this.afAuth.currentUser;
        await user?.updatePassword(password);
      }

      alert('Perfil actualizado correctamente.');
    }
  }

  // Cambiar la foto del usuario
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Simular la subida a Firebase Storage
      this.userPhoto = URL.createObjectURL(file);
      this.profileForm.patchValue({ photoURL: this.userPhoto });
    }
  }
}
