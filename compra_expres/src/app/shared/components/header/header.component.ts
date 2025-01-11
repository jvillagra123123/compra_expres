import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent  implements OnInit {
  @Input() title: string= ''; // Título de la página
  @Input() showBackButton: boolean = true; // Mostrar o No el botón de Volver

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  onBack(){
    this.navCtrl.back();
  }

}
