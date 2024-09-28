
import { Category } from './../../../project/interfaces/categorise';
import { oProduct } from '../../../project/interfaces/product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../..//project/services/product/product.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../global/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../..//project/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../../project/services/categories/categories.service';
import { WishlistService } from '../../../project/services/wishlist/wishlist.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink,
    UpperCasePipe, LowerCasePipe,
    CurrencyPipe, SearchPipe,
    FormsModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  products!: oProduct[];
  searchWord: string = '';
  getAllProductSub !: Subscription
  CategoriesList: Category[] = [];

  customOptionsCateg: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-circle-chevron-left"></i>', '<i class="fa-solid fa-circle-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-circle-chevron-left"></i>', '<i class="fa-solid fa-circle-chevron-right"></i>'],
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
    private _ToastrService: ToastrService,
    
    private _CategoriesService: CategoriesService,
    private _WishlistService: WishlistService) {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('page', '/home')
    }
  }
  ngOnInit(): void {

    this._CategoriesService.GetAllCategories().subscribe({
      next: (res) => {
        this.CategoriesList = res.data;
       
      },

    })
    this.getAllProductSub = this._ProductService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data.data;
      },
    })
  }

  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe()
  }



  addToCart(id: string) {

    const data = { productId: id, }
    this._CartService.addToCart(data).subscribe({
      next: (data) => {
       
        
        this._ToastrService.success(data.message);
        this._CartService.cartNumber.next(data.numOfCartItems);
      },
    })
  }

  Addtowishlist(id: string) {
    this._WishlistService.Addtowishlist(id).subscribe({
      next: (res) => {
        this._WishlistService.Addtowishlist(res.data);
      }
    })
  }
}
