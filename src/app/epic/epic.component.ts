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

  epicStats$;

  constructor(private store: Store<{}>){};

  ngOnInit() {

    this.store.dispatch(
      new FetchEpicStats(
        this.product,
        this.release,
        this.epic))

    let getEpicStats = createSelector(

      (state:{epicStats},props:{product,release,epic}) => {
        
        let p = state.epicStats[props.product];
        if (!p) {return null;}

        let r = p[props.release];
        if (!r) {return null;}

        return r[props.epic];});

    let product = this.product;
    let release = this.release;
    let epic = this.epic;

    this.epicStats$ = this.store.select(
      getEpicStats, {product,release,epic});

  }

}
