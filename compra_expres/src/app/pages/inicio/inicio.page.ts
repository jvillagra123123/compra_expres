import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,

})
export class InicioPage {
  selectedCategory: string = 'all';

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}



