import { Component, NgZone, OnInit } from '@angular/core';
import { CartService } from '../../..//project/services/cart.service';

import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../project/interfaces/cart';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  product!: Product[];
  id!: string;
  constructor(private _CartService: CartService, private _ToastrService:ToastrService,
    private _Router:Router,private ngZone:NgZone
  ) {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('page', '/cart')
    };
  }
  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (data) => {

        this.product = data.data.products,
          this.id = data.cartId

      },
      error: (data) => {

      }
    })
  }
  ubdateQantity(id: string, count: number) {
    const data = { count: count };
    this._CartService.UpdateCartProductQuantity(id, data).subscribe({
      next: (data) => {
        this.product = data.data.products,
          this._ToastrService.success("update is success")
      },
      error: (data) => {

      }
    })
  }

  deleteProduct(id: string) {
    this._CartService.deleteProductFromCart(id).subscribe({
      next: (data) => {
        this.product = data.data.products,
          this._ToastrService.success("update is success")
      },
      error: (data) => {

      }
    })
  }
  orderPage(){
    this.ngZone.run(()=>{
      this._Router.navigate(['order',this.id])
    })
  }
}
