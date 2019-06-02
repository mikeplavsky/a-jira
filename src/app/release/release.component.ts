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

  days(){

    return 12;

    let release = new Date( this.release.value.releaseDate);
    let start = new Date( this.release.value.releaseDate);

    return 11;
  }

  ngOnInit() {

    this.store.dispatch(
      new FetchReleaseStats(
        this.product,
        this.release.name));
    
    let getReleaseStats = createSelector(
      (state: {releases},props:{product,release}) => {
        let p = state.releases[props.product];
        return p ? p[props.release] : null;
      });

    let product = this.product;
    let release = this.release.name;

    this.releaseStats$ = this.store.select(
        getReleaseStats,{product, release });

  }
}
