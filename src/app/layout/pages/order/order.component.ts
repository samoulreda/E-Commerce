
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../project/services/order/order.service';
import { CartService } from '../../../project/services/cart/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  id!:string;
  loader: boolean = false;
  shippingAddress:FormGroup=new FormGroup({
    details:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required]),
    city:new FormControl(null,[Validators.required]),
  })
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private router:Router ,
    private _OrderService:OrderService, 
    
    private _CartService:CartService){}
  ngOnInit(): void {
   
  this._CartService.getCart().subscribe({
    next:(data)=>{
      if(!data.numOfCartItems){
        this.router.navigate(['/allorders'])
      }
      
    }
  })

    this._ActivatedRoute.paramMap.subscribe((res: any) => {
      if (typeof localStorage != 'undefined') {
        this.id = res['params'].id;
        localStorage.setItem('page', `/order/${this.id}`)};
    });
  }
  cearteOrders(){
    const shippingAddress={
      shippingAddress:this.shippingAddress.value
    }
  this._OrderService.CreateOrder(shippingAddress,this.id).subscribe({
    next:(data)=>{
      window.open(data.session.url,'-self')
   
      
    },

  })

  }
}
