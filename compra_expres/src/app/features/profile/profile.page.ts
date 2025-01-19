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
  profileForm!: FormGroup;
  userId: string | null = null; // Almacena el ID del usuario autenticado
  userPhoto: string = '/assets/images.jpg'; // Foto de perfil predeterminada
  authSrv: any;
  userSrv: any;
  user: any;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private alertCtr: AlertController
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

  async changeProfilePicture(){
    try {
      const alert = await this.alertCtr.create({
        header: 'Cambiar foto de perfil',
        message: '¿Cómo deseas subir la imagen?',
        buttons: [
          {
            text: 'Cámara',
            handler: () => this.selectImage(CameraSource.Camera)
          },
          {
            text: 'Galería',
            handler: () => this.selectImage(CameraSource.Photos)
          }
        ]
      });

      await alert.present();
      
    } catch (error) {
      console.log(error);
    }
  }

  async selectImage(source: CameraSource){
    try {

      const alertCtr = await this.alertCtr.create({
        header: 'Cambiar foto de perfil',
        message: '¿Estás seguro de que deseas cambiar la imagen?',
        buttons: [
          {
            text: 'Camára',
            handler:() => this.takePicture ()
          },
          {
            text: 'Galería',
            handler:() => this.selectPicture ()
          },
        ] 
       
        });
      // Tomar o seleccionar una imagen
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64, // Devuelve la imagen en Base64
        source: source,
      });

      if (image && image.base64String) {
        const base64Image = `data:image/jpeg;base64`;
      
        // Actualizar la imagen en Firestore
        const uid = await this.authSrv.getUserId();
        if(uid){
          await this.userSrv.updateProfilePicture(uid, base64Image );
          this.user.profilePicture = base64Image; // Actualizar localmente
          alert('Foto de perfil actualizada correctamente');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  selectPicture(): (boolean | void | { [key: string]: any; }) | Promise<boolean | void | { [key: string]: any; }> {
    throw new Error('Method not implemented.');
  }
  takePicture(): (boolean | void | { [key: string]: any; }) | Promise<boolean | void | { [key: string]: any; }> {
    throw new Error('Method not implemented.');
  }

}

