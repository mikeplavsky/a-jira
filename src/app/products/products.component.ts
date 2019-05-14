import { Component, OnInit } from '@angular/core';

import {MatBottomSheet} from '@angular/material';
import {ProductActionsComponent} from '../product-actions/product-actions.component';
import {ProductsService} from '../products.service';

import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[];

  constructor(
    private router: Router,
    private sheet: MatBottomSheet,
    private productsSvc: ProductsService){}

  openBottomSheet(product:any){

    let ref = this.sheet.open(
      ProductActionsComponent,
      {data: {...product}});

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)).subscribe(
        e => ref.dismiss());

  }

  ngOnInit(){
    this.products = this.productsSvc.getProducts();
  }

}
