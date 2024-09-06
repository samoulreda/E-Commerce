import { Component } from '@angular/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  constructor(){
    if(typeof localStorage !='undefined'){
  localStorage.setItem('page','/brands')
    }
  }
}
