import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import {Store, createSelector} from '@ngrx/store'
import { FetchEpics, epicsReducer } from '../product-reducer';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter } from 'rxjs/operators';
import { StoryActionsComponent } from '../story-actions/story-actions.component';

export function sorted_impl(v){
  if (!v) return v;
  return v.sort((a,b) => {
    if (!b.value || !a.value ) {return 0;}
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
      StoryActionsComponent,
      {data: {product,release,epic:epic.key}});

  }

}
