import { Component, OnInit, Input } from '@angular/core';

import {Store, select, createSelector} from '@ngrx/store'
import { FetchReleaseStats } from '../product-reducer'
import { release } from 'os';

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

  prediction(stat) {
    let v = this.velocity(stat);
    let left = stat.points - stat.done_points;
    return Math.ceil(left / v);
  }

  velocity(stat) {

    let ds = this.days();

    if (ds == 0) {
      return 0
    }

    let vs = stat.done_points / ds * 10;
    return Math.floor(vs);

  }

  days(all=false){
  
    let end:any = new Date( this.release.releaseDate);
    let start:any = new Date( this.release.startDate);

    let now = new Date();
    if (now < end && !all) {
      end = now;
    }

    let days = (end - start) / 1000 / 60 / 60 / 24; 
    return Math.floor(days);
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
