import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../project/services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  constructor(private _ProductService:ProductService){
    if(typeof localStorage !='undefined'){
  localStorage.setItem('page','/products')
    }
  }
  ngOnInit(): void {
      
  }
}
