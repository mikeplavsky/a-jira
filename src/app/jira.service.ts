import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JiraService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(
      `api/products`);
  }

  getQuery(product,query){
    return this.http.post(
      `api/query`,
      {product,query});
  }

  getSprint(product){
    return this.http.get(
      `api/products/${product}/sprint`);
  }

  getEpicStories(product,release,e){
    let epic = decodeURIComponent(e);
    return this.http.post(
      `api/stories`,
      {product,release,epic});
  }

  getEpicStats(product,release, epic){
    return this.http.get(
      `api/products/${product}/releases/${release}/epics/${epic}`);
  }

  getReleaseEpics(product,release){
    return this.http.get(
      `api/products/${product}/releases/${release}/epics`);
  }

  getVersions(product: string){
    return this.http.get(
      `api/products/${product}/versions`);
  }

  getVelocity(product: string){
    return this.http.get(
      `api/products/${product}/features/done`);
  }

  getReleaseStats(product, release) {
    return this.http.get(
      `api/products/${product}/releases/${release}`);
  }
  
}
