import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import {Store, createSelector} from '@ngrx/store'
import { FetchEpics } from '../product-reducer';
import { MatBottomSheet } from '@angular/material';
import { EpicActionsComponent } from '../epic-actions/epic-actions.component';
import { filter } from 'rxjs/operators';

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
    private route: ActivatedRoute) {}

  ngOnInit() {

    let product = this.product = this.route.snapshot.paramMap.get("p");
    let release = this.release = this.route.snapshot.paramMap.get("r");

    this.store.dispatch(
      new FetchEpics(this.product,this.release));

    let getEpics = createSelector(
      (state:{epics},props:{product,release}) => {
        let p = state.epics[props.product];
        return p ? p[props.release]: null;
    }); 

    this.epics$ = this.store.select(
      getEpics,{product,release}); 

  }

  openBottomSheet(product, release, epic){

    let ref = this.sheet.open(
      EpicActionsComponent,
      {data: {product,release,epic}});

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)).subscribe(
        e => ref.dismiss());

  }

}
