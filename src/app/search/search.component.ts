import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, createSelector } from '@ngrx/store';
import { FetchQuery, ClearQuery } from '../product-reducer';

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
    private route: ActivatedRoute) {}

  applyFilter(){

    this.store.dispatch(
      new ClearQuery(this.product));

    this.store.dispatch(
      new FetchQuery(this.product,this.query));

  }

  ngOnInit() {

    let product = this.product = this.route.snapshot.paramMap.get("p");

    let getStories = createSelector(
      (state:{queries},props:{product}) => {
        return state.queries[props.product];
    }); 

    this.query$ = this.store.select(
      getStories,{product}); 

  }

}
