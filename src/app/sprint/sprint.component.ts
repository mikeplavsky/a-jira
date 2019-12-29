import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, createSelector } from '@ngrx/store';
import { FetchSprint } from '../product-reducer';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  product;
  stories$;

  constructor(private store: Store<{}>,
    private route: ActivatedRoute) {}

  ngOnInit() {

    let product = this.product = this.route.snapshot.paramMap.get("p");

    this.store.dispatch(
      new FetchSprint(this.product));

    let getStories = createSelector(
      (state:{sprints}) => state.sprints,
      (sprints,props:{product}) => {
        return sprints[props.product];
    }); 

    this.stories$ = this.store.select(
      getStories,{product}); 
  }

}
