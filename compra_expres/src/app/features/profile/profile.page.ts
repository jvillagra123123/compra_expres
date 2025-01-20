import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  profileForm!: FormGroup; // Formulario reactivo para manejar los datos del perfil
  userId: string | null = null; // ID del usuario autenticado
  userPhoto: string = '/assets/images.jpg'; // Foto de perfil predeterminada
  authSrv: any; // Servicio de autenticación (no inicializado correctamente)
  userSrv: any; // Servicio de usuario (no inicializado correctamente)
  user: any; // Almacena información del usuario (falta tipado específico)
  takePicture: any; // Método para tomar una foto (no implementado correctamente)
  selectPicture: any; // Método para seleccionar una foto (no implementado correctamente)

  constructor(
    private fb: FormBuilder, // Generador de formularios
    private afAuth: AngularFireAuth, // Autenticación de Firebase
    private firestore: AngularFirestore, // Base de datos Firestore
    private alertCtr: AlertController // Controlador de alertas
  ) {}

  ngOnInit() {
    this.initializeForm(); // Inicializa el formulario reactivo
    this.loadUserData(); // Carga los datos del usuario autenticado
  }

  // Inicializa el formulario con validaciones
  initializeForm() {
    this.profileForm = this.fb.group(
      {
        firstName: ['', Validators.required], // Nombre requerido
        lastName: ['', Validators.required], // Apellido requerido
        email: [{ value: '', disabled: true }], // Email deshabilitado
        photoURL: [''], // URL de la foto de perfil
        password: [
          '', // Contraseña con validaciones (longitud y patrones)
          [
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/),
          ],
        ],
        confirmPassword: [''], // Campo para confirmar contraseña
      },
      { validator: this.passwordMatchValidator } // Validador personalizado para confirmar contraseñas
    );
  }

  // Valida que las contraseñas coincidan
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }
  

  // Carga los datos del usuario desde Firebase y los asigna al formulario
  async loadUserData() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.userId = user.uid;

      // Recupera información del usuario desde Firestore
      this.firestore
        .collection('users')
        .doc(this.userId)
        .valueChanges()
        .subscribe((userData: any) => {
          if (userData) {
            this.profileForm.patchValue({
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: user.email,
              photoURL: userData.photoURL || this.userPhoto,
            });
            this.userPhoto = userData.photoURL || this.userPhoto;
          }
        });
    }
  }

  // Guarda los cambios en el perfil del usuario
  async saveProfile() {
    if (this.profileForm.valid && this.userId) {
      const { firstName, lastName, photoURL, password } = this.profileForm.value;

      // Actualiza la información en Firestore
      await this.firestore
        .collection('users')
        .doc(this.userId)
        .update({ firstName, lastName, photoURL });

      // Actualiza la contraseña en Firebase si se especifica
      if (password) {
        const user = await this.afAuth.currentUser;
        await user?.updatePassword(password);
      }

      alert('Perfil actualizado correctamente.');
    }
  }

  // Permite cambiar la foto de perfil
  async changeProfilePicture() {
    try {
      const alert = await this.alertCtr.create({
        header: 'Cambiar foto de perfil',
        message: '¿Cómo deseas subir la imagen?',
        buttons: [
          {
            text: 'Cámara',
            handler: () => this.selectImage(CameraSource.Camera),
          },
          {
            text: 'Galería',
            handler: () => this.selectImage(CameraSource.Photos),
          },
        ],
      });
      await alert.present();
    } catch (error) {
      console.log(error);
    }
  }

  // Permite seleccionar una imagen desde la cámara o galería
  async selectImage(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: source,
      });

      if (image && image.base64String) {
        const base64Image = `data:image/jpeg;base64,${image.base64String}`;
        if (this.userId) {
          await this.firestore
            .collection('users')
            .doc(this.userId)
            .update({ photoURL: base64Image });
          this.userPhoto = base64Image;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
