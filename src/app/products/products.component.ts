import { Component, OnInit } from '@angular/core';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { StoryActionsComponent } from '../story-actions/story-actions.component';

import {Router, NavigationEnd} from '@angular/router';
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
    private router: Router,
    private sheet: MatBottomSheet,
    public svc: JiraService){}

  openBottomSheet(product:any){

    let ref = this.sheet.open(
      StoryActionsComponent,
      {data: {product}});

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)).subscribe(
        e => ref.dismiss());

  }

  ngOnInit(){
    this.svc.getProducts().subscribe(data => {
      this.products = data;
    });
  }

}
