import { TranslateModule } from '@ngx-translate/core';
import { IWishlist } from './../../../project/interfaces/wishlist';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../project/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../project/services/cart/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe,TranslateModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,)
    { if (typeof localStorage != 'undefined') {
    localStorage.setItem('page', '/wish list')
  }}
  products!: IWishlist[];
  id!: string;
  // WishlistItem :IWishlist ={} as IWishlist;

  ngOnInit(): void {
    this._WishlistService.Getuserwishlist().subscribe({
      next: (res) => {
        this.products = res.data;
        this._ToastrService.success("update is success");
        
      }
    })
  }

  addToCart(id: string) {

    const data = { productId: id }
    this._CartService.addToCart(data).subscribe({
      next: (data) => {
        this._ToastrService .success(data.message)
      },
    })
  }

  RemoveItem(id: string): void {
    this._WishlistService.RemoveFromWishList(id).subscribe({
      next: (res) => {
        this.products = res.data;
        this._ToastrService.success("update is success")

      }
    })
  }
}
