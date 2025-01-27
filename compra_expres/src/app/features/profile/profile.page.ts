import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/core/models/user.model';
import { AuthProvider, EmailAuthProvider } from '@angular/fire/auth'; // Importa correctamente EmailAuthProvider


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  profileForm!: FormGroup; // Formulario reactivo para manejar los datos del perfil
  userId: string | null = null; // ID del usuario autenticado
  userPhoto: string = ''; // Foto de perfil predeterminada
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
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required], // Nombre obligatorio
      lastName: ['', Validators.required],  // Apellido obligatorio
      password: ['', Validators.required],  // Contraseña actual obligatoria
      newPassword: [''],                    // Nueva contraseña (opcional)
    });
  }
  

  // Valida que las contraseñas coincidan
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }
  

  // Carga los datos del usuario desde Firebase y los asigna al formulario
  async loadUserData() {
    try {
      const user = await this.afAuth.currentUser; // Obtén el usuario autenticado
      if (user) {
        this.userId = user.uid; // Guarda el UID del usuario
        console.log('UID del usuario:', this.userId); // Verifica si llega el UID
  
        // Recupera los datos del usuario desde Firestore
        this.firestore
          .collection('users')
          .doc(this.userId)
          .valueChanges()
          .subscribe((userData: any) => {
            if (userData) {
              console.log('Datos del usuario desde Firestore:', userData); // Verifica los datos
  
              // Aquí actualizamos los datos del formulario
              this.profileForm.patchValue({
                firstName: userData.firstName || '', // Nombre
                lastName: userData.lastName || '', // Apellido
                email: user.email, // Email del usuario
                photoURL: userData.photoURL || this.userPhoto, // Imagen
              });
  
              console.log('Datos asignados al formulario:', this.profileForm.value); // Verifica el formulario
              this.userPhoto = userData.photoURL || this.userPhoto; // Actualiza la imagen
            } else {
              console.log('No se encontraron datos del usuario en Firestore.');
            }
          });
      } else {
        console.log('No se pudo obtener el usuario autenticado.');
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error); // Maneja posibles errores
    }
  }
  
  isFormValid(): boolean {
    const password = this.profileForm.get('password')?.value;
    return this.profileForm.valid && !!password;
  }

  passwordFieldHasValue(): boolean {
    const password = this.profileForm.get('password');
    console.log('Password value:', password?.value);
    console.log('Password valid:', password?.valid);
    return !!password?.value && password.valid;
  }
  

 // Guarda los cambios en el perfil del usuario
 async saveProfile() {
  if (this.profileForm.valid && this.userId) {
    const { firstName, lastName, password, newPassword } = this.profileForm.value;

    // Comprobar si se ingresó la contraseña actual
    if (!password || password.trim() === '') {
      alert('Por favor, ingresa tu contraseña actual para confirmar los cambios.');
      return;
    }

    try {
      const user = await this.afAuth.currentUser;

      if (user) {
        // Reautenticar al usuario con la contraseña actual
        const credential = EmailAuthProvider.credential(
          user.email || '',
          password
        );
        await user.reauthenticateWithCredential(credential);

        // Actualizar el nombre y apellido en Firestore
        await this.firestore
          .collection('users')
          .doc(this.userId)
          .update({
            firstName,
            lastName,
          });

        // Si se ingresó una nueva contraseña, actualízala
        if (newPassword && newPassword.trim() !== '') {
          if (newPassword.length < 6 || newPassword.length > 12) {
            if (newPassword.length < 6) {
              alert('La nueva contraseña debe tener al menos 6 caracteres.');
            }
            if (newPassword.length > 12) {
              alert('La nueva contraseña debe tener un máximo de 12 caracteres.');
            }
            return;
          }
          await user.updatePassword(newPassword);
          alert('Contraseña actualizada correctamente.');
        }

        alert('Perfil actualizado correctamente.');
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('La contraseña actual ingresada es incorrecta.');
    }
  } else {
    alert('Por favor, completa todos los campos obligatorios.');
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
