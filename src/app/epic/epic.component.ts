import { Component, OnInit, Input } from '@angular/core';

import {Store, createSelector} from '@ngrx/store'
import {FetchEpicStats} from '../product-reducer'

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

    let getEpicStats = createSelector(

      ({epics}) => epics,

      (epics,{product,release,epic}) => {
        
        let p = epics[product];
        if (!p) {return null;}

        let r = p[release];
        if (!r) {return null;}

        return r[epic];});

    let product = this.product;
    let release = this.release;
    let epic = this.epic;

    this.epicStats$ = this.store.select(
      getEpicStats, {product,release,epic});

  }
}
