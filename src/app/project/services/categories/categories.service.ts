import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Categories } from '../../interfaces/categorise';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  GetAllCategories(): Observable<Categories>  {
    return this.http.get<Categories>(environment.url + 'categories');
  }

  Getspecificcategory(id: string): Observable<any> {
    return this.http.get(environment.url + 'categories/' + id);
  }
}
