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

  releaseStats$;
  constructor(private store: Store<{}>){};

  ngOnInit() {

    this.store.dispatch(
      new FetchReleaseStats(
        this.product,
        this.release.key));
    
    let getReleaseStats = createSelector(
      (state: {releases},props:{product,release}) => {
        let p = state.releases[props.product];
        return p ? p[props.release] : null;
      });

    let product = this.product;
    let release = this.release.key;

    this.releaseStats$ = this.store.select(
        getReleaseStats,{product, release });

  }
}
