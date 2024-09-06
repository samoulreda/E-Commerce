import { product } from '../interfaces/product';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  getAllProducts(): Observable<product>  {
    return this.http.get<product>(environment.url + 'products');
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(environment.url + 'products/' + id);
  }
}
