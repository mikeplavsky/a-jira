import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, createSelector } from '@ngrx/store';
import { FetchReleaseStories } from '../product-reducer';

@Component({
  selector: 'app-release-stories',
  templateUrl: './release-stories.component.html',
  styleUrls: ['./release-stories.component.css']
})
export class ReleaseStoriesComponent implements OnInit {

  product;
  release;
  stories$;

  constructor(private store: Store<{}>,
    private route: ActivatedRoute) {}

  ngOnInit() {

    let product = this.product = this.route.snapshot.paramMap.get("p");
    let release = this.release = this.route.snapshot.paramMap.get("r");


    this.store.dispatch(
      new FetchReleaseStories(this.product,this.release));

    let getStories = createSelector(
      (state:{releaseStories}) => state.releaseStories,
      (releaseStories,props:{product,release}) => {
        let p = releaseStories[props.product];
        return p ? p[props.release]: null;
    }); 

    this.stories$ = this.store.select(
      getStories,{product,release}); 

  }

}
