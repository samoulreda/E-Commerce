import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Brands } from '../../interfaces/brand';


@Injectable({
  providedIn: 'root'
})
export class BrandService {


  constructor(private http: HttpClient) { }


  GetAllBrands(): Observable<Brands>  {
    return this.http.get<Brands>(environment.url + 'brands');
  }

  Getspecificbrand(id: string): Observable<any> {
    return this.http.get(environment.url + 'brands/' + id);
  }

}
