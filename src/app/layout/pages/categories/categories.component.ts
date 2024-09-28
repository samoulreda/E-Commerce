
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../project/interfaces/categorise';
import { CategoriesService } from '../../../project/services/categories/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  Categories!: Category[];
  id!: string;

  constructor(private _CategoriesService:CategoriesService){
    if(typeof localStorage !='undefined'){
  localStorage.setItem('page','/categories')
    }
  }
  ngOnInit(): void {
    
    this._CategoriesService.GetAllCategories().subscribe({
      next: (data) => {
        this.Categories = data.data;
      
      }
    })
  }
}
