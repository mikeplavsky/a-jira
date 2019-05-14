import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JiraService {

  constructor(private http: HttpClient) { }

  getVersions(product: string){
    return this.http.get(`api/product/${product}/versions`);
  }
  
}
