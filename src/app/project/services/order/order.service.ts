import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  CreateOrder(data:any,id:string):Observable<any>{
    return this.http.post<any>(environment.url + `orders/checkout-session/${id}?url=http://localhost:4200`, data);
  }



}
