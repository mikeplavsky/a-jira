import { Component, OnInit, Input } from '@angular/core';

import {Store, createSelector} from '@ngrx/store'
import { FetchReleaseStats } from '../product-reducer'

export function velocity (stat, days) {

  if (days == 0) {
    return 0
  }

  let vs = stat.done_points / days * 10;
  return Math.ceil(vs);

}

export function prediction_of_sprints(stat, days) {

  let v = velocity(stat, days);
  if (!v) return 0;

  let left = stat.points - stat.done_points;
  return Math.ceil(left / v);

}

export function days(release, all=false){

  let end:any = new Date(release.releaseDate);
  let start:any = new Date(release.startDate);

  let now = new Date();
  if (start < now && now < end && !all) {
    end = now;
  }

  let days = (end - start) / 1000 / 60 / 60 / 24; 
  return Math.floor(days);

}

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

    return prediction_of_sprints(
      stat,
      this.days());

  }

  predicted_date(stat) {

    return new Date(
      Date.now() + this.prediction(stat) * 10 * 24 * 60 * 60 * 1000);

  }

  velocity(stat) {

    return velocity(
      {done_points:stat.done_points}, 
      this.days());

  }

  days(all=false){
    return days(this.release,all);
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
