import { Component, OnInit } from '@angular/core';

import {MatBottomSheet} from '@angular/material';
import {ProductActionsComponent} from '../product-actions/product-actions.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [
    "RMAD/FE",
    "RMAZ",
    "QMMP"
  ]  

  constructor(private sheet: MatBottomSheet){}

  openBottomSheet(){
    this.sheet.open(ProductActionsComponent);
  }

  ngOnInit(){}

}
