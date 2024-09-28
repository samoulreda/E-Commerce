import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }


  Addtowishlist(id:string):Observable<any>{
    return this._HttpClient.post<any>(environment.url + 'wishlist',
      {"productId":id})
  }

  Getuserwishlist():Observable<any>{
    return this._HttpClient.get<any>(environment.url + 'wishlist')
  }

  RemoveFromWishList(id:string):Observable<any>{
    return this._HttpClient.delete(environment.url + 'wishlist/' + id)
      
  }



}
