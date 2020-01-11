import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, createSelector } from '@ngrx/store';
import { FetchStories } from '../product-reducer';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  product;
  release;
  epic;
  stories$;

  constructor(private store: Store<{}>,
    private route: ActivatedRoute) {}

  ngOnInit() {

    let product = this.product = this.route.snapshot.paramMap.get("p");
    let release = this.release = this.route.snapshot.paramMap.get("r");
    let epic = this.epic = this.route.snapshot.paramMap.get("e");

    this.store.dispatch(
      new FetchStories(this.product,this.release,this.epic));

    let getStories = createSelector(
      ({stories}) => stories,
      (stories,{product,release,epic}) => {
        let p = stories[product];
        let r = p ? p[release]: null;
        return r ? r[epic]: null;
    }); 

    this.stories$ = this.store.select(
      getStories,{product,release,epic}); 

  }

}