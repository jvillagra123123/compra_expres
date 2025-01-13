import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-alert-regis',
  templateUrl: './alert-regis.component.html',
  styleUrls: ['./alert-regis.component.scss'],
  standalone: false,
 
})
export class AlertRegisComponent  implements OnInit {
  alertButtons = ['Action'];

  constructor() { }

  ngOnInit() {}

}



