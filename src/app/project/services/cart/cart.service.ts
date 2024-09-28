import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(data: any): Observable<any> {
    return this.http.post<any>(environment.url + 'cart', data);
  }

  UpdateCartProductQuantity(id: string, data: any): Observable<any> {
    return this.http.put<any>(environment.url + 'cart/' + id, data);
  }

  getCart(): Observable<any> {
    return this.http.get<any>(environment.url + 'cart');
  }

  deleteProductFromCart(id: string): Observable<any> {
    return this.http.delete<any>(environment.url + 'cart/' + id);
  }

  clearCart(): Observable<any> {
    return this.http.delete<any>(environment.url + 'cart');
  }
}
