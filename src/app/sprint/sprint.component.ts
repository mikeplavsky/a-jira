import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import { Store, createSelector } from '@ngrx/store';
import { FetchSprint } from '../product-reducer';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { StoryActionsComponent } from "../story-actions/story-actions.component";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  product;
  stories$;

  constructor(private store: Store<{}>,
    private sheet: MatBottomSheet,
    private router: Router,
    private route: ActivatedRoute) {
    }

  ngOnInit() {

    let product = this.product = this.route.snapshot.paramMap.get("p");

    this.store.dispatch(
      new FetchSprint(this.product));

    let getStories = createSelector(
      ({sprints}) => sprints,
      (sprints,{product}) => sprints[product]); 

    this.stories$ = this.store.select(
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
