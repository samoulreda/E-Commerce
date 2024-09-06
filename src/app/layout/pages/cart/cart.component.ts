import { Component, OnInit } from '@angular/core';
import { CartService } from '../../..//project/services/cart.service';

import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../project/interfaces/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  product!:Product[]
constructor(private _CartService:CartService,private toastr: ToastrService){
  if(typeof localStorage !='undefined'){
localStorage.setItem('page','/cart')
  };
}
ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (data) => {

this.product=data.data.products,
        console.log(this.product);
        
      },
      error: (data) => {

      }
    })
}
ubdateQantity(id:string,count:number){
const data={count:count}; 
this._CartService.UpdateCartProductQuantity(id,data).subscribe({
  next: (data) => {
    this.product=data.data.products,
    this.toastr.success("update is success")
  },
  error: (data) => {

  }
})
}

deleteProduct(id:string){
  this._CartService.deleteProductFromCart(id).subscribe({
    next: (data) => {
      this.product=data.data.products,
      this.toastr.success("update is success")
    },
    error: (data) => {
  
    }
  })
}
}
