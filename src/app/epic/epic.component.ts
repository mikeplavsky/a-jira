import { Component, OnInit, Input } from '@angular/core';

import {Store, createSelector} from '@ngrx/store'
import { FetchEpicStats } from '../product-reducer'

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.css']
})
export class EpicComponent implements OnInit {

  @Input() release;
  @Input() product;
  @Input() epic;

  constructor(private store: Store<{}>){};

  ngOnInit() {
    this.store.dispatch(
      new FetchEpicStats(
        this.product,
        this.release,
        this.epic))
  }

}
