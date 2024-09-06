import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  constructor(){
    if(typeof localStorage !='undefined'){
  localStorage.setItem('page','/categories')
    }
  }
}
