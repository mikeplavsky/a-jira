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

  points$;
  done_points$;
  features$;
  done_features$;

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

    let getPoints = createSelector(
      getReleaseStats, state => state.points);

    let getDonePoints = createSelector(
      getReleaseStats, state => state.done_points);

    let getFeatures = createSelector(
      getReleaseStats, state => state.features);

    let getDoneFeatures = createSelector(
      getReleaseStats, state => state.done_features);

    let product = this.product;
    let release = this.release.key;

    let selector = (x) => this.store.select(x,{product,release});

    this.points$ = selector(getPoints);
    this.done_points$ = selector(getDonePoints);
    this.features$ = selector(getFeatures);
    this.done_features$ = selector(getDoneFeatures);

    this.releaseStats$ = this.store.select(
        getReleaseStats,{product, release });

  }
}
