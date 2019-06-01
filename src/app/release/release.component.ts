import { Component, OnInit, Input } from '@angular/core';

import {Store, select, createSelector} from '@ngrx/store'
import { FetchReleaseStats } from '../product-reducer'

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.css']
})
export class ReleaseComponent implements OnInit {

  @Input() release:any;
  @Input() product:any;

  constructor(private store: Store<{}>){};

  ngOnInit() {
    return

    this.store.dispatch(
      new FetchReleaseStats(
        this.product,
        this.release.key));

  }

}
