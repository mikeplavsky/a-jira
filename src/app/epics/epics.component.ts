import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import {Store, createSelector} from '@ngrx/store'
import { FetchEpics, epicsReducer } from '../product-reducer';
import { MatBottomSheet } from '@angular/material';
import { EpicActionsComponent } from '../epic-actions/epic-actions.component';
import { filter } from 'rxjs/operators';

export function sorted_impl(v){
  if (!v) return v;
  return v.sort((a,b) => {
    return b.value.points - a.value.points; 
  });
}

@Component({
  selector: 'app-epics',
  templateUrl: './epics.component.html',
  styleUrls: ['./epics.component.css']
})
export class EpicsComponent implements OnInit {

  product:any;
  release: any;
  epics$;

  constructor(private store: Store<{}>,
    private sheet: MatBottomSheet,
    private router: Router,
    private route: ActivatedRoute) {
    }

  sorted(v:[any]){
    return sorted_impl(v);
  }

  ngOnInit() { 

    let product = this.product = this.route.snapshot.paramMap.get("p");
    let release = this.release = this.route.snapshot.paramMap.get("r");

    this.store.dispatch(
      new FetchEpics(this.product,this.release));

    let getEpics = createSelector(

      ({epics}) => epics,

      (epics,{product,release}) => {
        let p = epics[product];
        return p ? p[release]: null;

    }); 

    this.epics$ = this.store.select(
      getEpics,{product,release}); 

  }

  openBottomSheet(product, release, epic){

    let ref = this.sheet.open(
      EpicActionsComponent,
      {data: {product,release,epic:epic.key}});

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)).subscribe(
        e => ref.dismiss());

  }

}
