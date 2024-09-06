import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(){
    if(typeof localStorage !='undefined'){
  localStorage.setItem('page','/not-found');
    };
  }
}
