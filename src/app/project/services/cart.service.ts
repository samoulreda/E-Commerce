
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  headers = { headers: { token: localStorage.getItem('userToken') || '' } };
  constructor(private http: HttpClient) { }

  addToCart(data:any): Observable<any> {
    return this.http.post<any>(environment.url + 'cart', data, this.headers);
  }

  UpdateCartProductQuantity(id: string, data: any): Observable<any> {
    return this.http.put<any>(environment.url + 'cart/' + id, data, this.headers);
  }

  getCart(): Observable<any> {
    return this.http.get<any>(environment.url + 'cart', this.headers);
  }

  deleteProductFromCart(id: string): Observable<any> {
    return this.http.delete<any>(environment.url + 'cart/' + id, this.headers);
  }

  clearCart(): Observable<any> {
    return this.http.delete<any>(environment.url + 'cart', this.headers);
  }
}
