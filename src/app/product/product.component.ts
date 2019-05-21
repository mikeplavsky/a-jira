import { Component, OnInit, Input } from '@angular/core';
import {JiraService} from '../jira.service';

import {Store, select, createSelector} from '@ngrx/store'
import { Observable, EMPTY } from 'rxjs';

import { FetchProduct } from '../product-reducer'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product:any;
  product$: any;

  constructor(
    private jiraSvc: JiraService,
    private store: Store<{}>) {
  };

  ngOnInit() {

    this.store.dispatch(
      new FetchProduct(this.product.name));
    
    let getProduct = createSelector(
      (state: {products},props: {name}) => {
        return state.products[props.name];});

    this.product$ = this.store.pipe(
      select(getProduct,{name: this.product.name}));

  }

}
