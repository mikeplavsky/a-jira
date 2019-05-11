import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = [
    {id:1,name:"RMAD/FE"},
    {id:2,name:"RMAZ"},
    {id:3,name:"QMMP"}
  ]  

  constructor() {}
  
  getProducts(){
    return this.products;
  }

}
