import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../project/services/product/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../global/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { oProduct } from '../../../project/interfaces/product';
import { CartService } from '../../..//project/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule, RouterLink, UpperCasePipe,
     LowerCasePipe, CurrencyPipe, SearchPipe, FormsModule, TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products!: oProduct[];
  searchWord: string = '';
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private toastr: ToastrService) {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('page', '/home')
    }
  }
  ngOnInit(): void {
    
    this._ProductService.getAllProducts().pipe(
      map((res) => {
        res.data.map((product) => {
          product.price = product.price * 10
          return product
        })
        return res
      })
    ).subscribe({
      next: (data) => {
        this.products = data.data;
        
      },
    })
  }

  addToCart(id: string) {

    const data = { productId: id, }
    this._CartService.addToCart(data).subscribe({
      next: (data) => {
        this.toastr.success(data.message)
      },
    })
  }
  
}
