import { Component, OnInit } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: false,

})
export class SearchComponent  implements OnInit {
  public data = [
    'Doña Clara',
    'Donde Raul',
    'Delicias!!!!',
    'DeSabores',
    'DalDog',
    'DGregori',
  ];
  public results = [...this.data];

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.data.filter((d) => d.toLowerCase().includes(query));
  }


  constructor() { }

  ngOnInit() {}

}


