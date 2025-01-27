import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  async signUp(firstName: string, lastName: string, email: string, password: string) {
    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        // Guardar datos adicionales del usuario en Firestore
        await this.firestore.collection('users').doc(user.uid).set({
          firstName,
          lastName,
          email,
          role: 'estandar', // Agregar rol predeterminado
          uid: user.uid,
        });
      }
      return user;
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.afAuth.currentUser;
      return user;
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
      throw error;
    }
  }
  
}


