import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JiraService {

  constructor(private http: HttpClient) { }

  getEpicStories(product,release,epic){
    return this.http.get(
      `api/products/${product}/releases/${release}/epics/${epic}`);
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
