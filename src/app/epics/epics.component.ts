import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {Store, createSelector} from '@ngrx/store'
import { FetchEpics } from '../product-reducer';

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

}
