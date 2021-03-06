import { Component, OnInit, Input } from '@angular/core';

import {Store, createSelector} from '@ngrx/store'
import { FetchReleaseStats } from '../product-reducer'

const sprint = 14;

export function velocity (stat, days) {

  if (days == 0) {
    return 0;
  }

  let vs = stat.done_points / days * sprint;
  return Math.ceil(vs);

}

export function prediction_of_sprints(stat, days) {

  let v = velocity(stat, days);
  if (!v) return 0;

  let left = stat.points - stat.done_points;
  return Math.ceil(left / v);

}

export function days(release, 
  all=false, get_now=()=>new Date() ){

  let end:any = new Date(release.releaseDate);
  let start:any = new Date(release.startDate);

  let now = get_now();
  if (start < now && now < end && !all) {
    end = now;
  }

  let days = (end - start) / 1000 / 60 / 60 / 24; 

  if (start > now && !all) {
    days = 0;
  }

  return Math.floor(days);

}

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.css']
})
export class ReleaseComponent implements OnInit {

  sprintsMapping = {
    "=NaN": "? sprints",
    "=0": "? sprints",
    "=1" : "# sprint",
    "other": "# sprints"};

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

    let p = this.prediction(stat);
    if (!p) { return null};

    return new Date(
      Date.now() + p * sprint * 24 * 60 * 60 * 1000);

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
      (state: {releases}) => state.releases,
      (releases,props:{product,release}) => {
        let p = releases[props.product];
        return p ? p[props.release] : null;
      });

    let product = this.product;
    let release = this.release.name;

    this.releaseStats$ = this.store.select(
        getReleaseStats,{product, release });

  }
}
