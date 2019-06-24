import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = [
    {id: 1, name: 'RMADFE'},
    {id: 2, name: 'RMAZ'},
    {id: 3, name: 'QMMP'},
    {id: 4, name: 'ODRT'}
  ];

  constructor() {}
  
  getProducts(){
    return this.products;
  }

}
