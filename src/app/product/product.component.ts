import { Component, OnInit, Input } from '@angular/core';
import {JiraService} from '../jira.service';

import {Store, select} from '@ngrx/store'
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
  products$: Observable<{}>;

  constructor(
    private jiraSvc: JiraService,
    private store: Store<{}>) {
      this.products$ = store.pipe(select('products'));
  };

  ngOnInit() {
    
    this.store.dispatch(new FetchProduct());

    /*this.jiraSvc.getVelocity(this.product.name).subscribe(v => {
      this.velocity = v;
      //
    });*/
  }

}
