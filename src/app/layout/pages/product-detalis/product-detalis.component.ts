import { oProduct } from '../../../project/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../..//project/services/product/product.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-detalis',
  standalone: true,
  imports: [],
  templateUrl: './product-detalis.component.html',
  styleUrl: './product-detalis.component.scss'
})
export class ProductDetalisComponent implements OnInit {
  id!: string;
  product!:oProduct;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService:ProductService) {
  }
  ngOnInit(): void {
    
    this._ActivatedRoute.paramMap.subscribe((res: any) => {
      if (typeof localStorage != 'undefined') {
        this.id = res['params'].id;
        localStorage.setItem('page', `/product-detalis/${this.id}`)
      }
      this._ProductService.getProduct(this.id).subscribe({
        next:(data)=>{
          this.product=data.data;
          
        },
      })
    })
  }
}
