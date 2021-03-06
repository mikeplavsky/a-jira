import { Component, OnInit, Input } from '@angular/core';

import {Store, select, createSelector} from '@ngrx/store'
import { FetchProduct } from '../product-reducer'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product:any;
  product$: any;

  constructor(private store: Store<{}>){};

  ngOnInit() {

    this.store.dispatch(
      FetchProduct({product:this.product.name}));
    
    let getProduct = createSelector(
      ({products}) => products,
      (products,{name}) => products[name]);

    this.product$ = this.store.pipe(
      select(getProduct,{name: this.product.name}));

  }

}
