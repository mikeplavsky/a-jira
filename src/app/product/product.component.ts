import { Component, OnInit, Input } from '@angular/core';
import {JiraService} from '../jira.service';

import {Store, select, createSelector} from '@ngrx/store'
import { Observable } from 'rxjs';

import { FetchProduct } from '../product-reducer'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product:any;

  velocity:any;
  products$: Observable<{velocity}>;

  constructor(
    private jiraSvc: JiraService,
    private store: Store<{}>) {
  };

  ngOnInit() {
    
    let getProduct = createSelector((state,props) => {
      return state.products[props.name];
    });

    this.products$ = this.store.pipe(
      select(getProduct,{name: this.product.name}));

    this.store.dispatch(
      new FetchProduct(this.product.name));
  }

}
