import { Component, OnInit } from '@angular/core';
import {Store, select, createSelector} from '@ngrx/store'
import { FetchProducts } from '../product-reducer';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { StoryActionsComponent } from '../story-actions/story-actions.component';

import {filter} from 'rxjs/operators';
import { JiraService } from '../jira.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products;

  constructor(
    private store: Store<{products}>,
    private sheet: MatBottomSheet,
    public svc: JiraService){}

  openBottomSheet(product:any){

    let ref = this.sheet.open(
      StoryActionsComponent,
      {data: {product}});

  }

  ngOnInit(){
    
    this.store.dispatch(FetchProducts());

    this.products = this.store.pipe(
      select( ({products}) => products.products ));

  }

}
