import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {Store, select, createSelector} from '@ngrx/store'
import { FetchEpics } from '../product-reducer';

@Component({
  selector: 'app-epics',
  templateUrl: './epics.component.html',
  styleUrls: ['./epics.component.css']
})
export class EpicsComponent implements OnInit {

  product:any;
  release: any;

  constructor(private store: Store<{}>,
    private route: ActivatedRoute) {}

  ngOnInit() {

    this.product = this.route.snapshot.paramMap.get("p");
    this.release = this.route.snapshot.paramMap.get("r");

    this.store.dispatch(
      new FetchEpics(this.product,this.release));

  }

}
