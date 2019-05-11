import { Component, OnInit } from '@angular/core';

import {MatBottomSheet} from '@angular/material';
import {ProductActionsComponent} from '../product-actions/product-actions.component';
import {ProductsService} from '../products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[];

  constructor(
    private sheet: MatBottomSheet,
    private productsSvc: ProductsService){}

  openBottomSheet(product:any){
    this.sheet.open(
      ProductActionsComponent,
      {data: {...product}});
  }

  ngOnInit(){
    this.products = this.productsSvc.getProducts();
  }

}
