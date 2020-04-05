import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import { Store, createSelector } from '@ngrx/store';
import { FetchQuery, ClearQuery } from '../product-reducer';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter } from 'rxjs/operators';
import { StoryActionsComponent } from '../story-actions/story-actions.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query;
  product;
  query$;

  constructor(private store: Store<{}>,
    private sheet: MatBottomSheet,
    private router: Router,
    private route: ActivatedRoute) {
    }

  applyFilter(){

    this.store.dispatch(
      new ClearQuery(this.product));

    this.store.dispatch(
      new FetchQuery(this.product,this.query));

  }

  ngOnInit() {

    let product = this.product = this.route.snapshot.paramMap.get("p");

    let getStories = createSelector(
      (state:{queries}) => state.queries,
      (queries,props:{product}) => {
        return queries[props.product];
    }); 

    this.query$ = this.store.select(
      getStories,{product}); 

  }

  openBottomSheet(product){

    let ref = this.sheet.open(
      StoryActionsComponent,
      {data: {product}});

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)).subscribe(
        e => ref.dismiss());

  }

}
