import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local-verification',
  templateUrl: './local-verification.page.html',
  styleUrls: ['./local-verification.page.scss'],
  standalone: false,

})
export class LocalVerificationPage implements OnInit {
  stars: number[] = [1, 1, 1, 1, 1];  // Estrellas para la calificación
  newComment: string = ''; // Variable para el nuevo comentario
  comments: { user: string, date: string, text: string }[] = [
    { user: 'Usuario 1', date: '2025-01-12', text: '¡Excelente servicio!' },
    { user: 'Usuario 2', date: '2025-01-10', text: 'Muy buena comida.' },
  ];


  ngOnInit() {}

  openMap() {
    // Lógica para abrir el mapa o redirigir a una nueva página
    console.log('Abrir mapa');
  }

  submitComment() {
    if (this.newComment.trim()) {
      const newCommentData = {
        user: 'Nuevo Usuario', // Aquí podrías añadir un sistema de usuario
        date: new Date().toLocaleDateString(),
        text: this.newComment,
      };
      this.comments.push(newCommentData);
      this.newComment = ''; // Limpiar el campo de comentario
    }
  }
}