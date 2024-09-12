import { oProduct } from '../../../project/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../..//project/services/product.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { OnSalePipe } from '../../global/pipe/on-sale.pipe';
import { SearchPipe } from '../../global/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../..//project/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, UpperCasePipe, LowerCasePipe, CurrencyPipe, SearchPipe, FormsModule,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products!: oProduct[];
  searchWord: string = '';
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

  constructor(
    private _ProductService: ProductService, 
    private _CartService: CartService,
    private toastr: ToastrService) 
    {if (typeof localStorage != 'undefined') {
      localStorage.setItem('page', '/home')
    }
  }
  ngOnInit(): void {
    this._ProductService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data.data;
      },
      error: (data) => { }
    })
  }

  addToCart(id: string) {

    const data = { productId:id, }
    this._CartService.addToCart(data).subscribe({
      next: (data) => {
        this.toastr.success(data.message)
      },
      error: (data) => {

      }
    })


  }


}
