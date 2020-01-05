import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

import {MatBottomSheet} from '@angular/material';
import {ReleaseActionsComponent} from '../release-actions/release-actions.component';

import {Store, select, createSelector} from '@ngrx/store'
import { FetchReleases } from '../product-reducer'

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {

  releases$:any;
  product:any;

  constructor(private store: Store<{}>,
    private router: Router,
    private sheet: MatBottomSheet,
    private route: ActivatedRoute) {}

  sorted(v:[any]){
    if (!v) return v;
    return v.sort((a,b) => {

      let a_release = a.value.releaseDate;
      let b_release = b.value.releaseDate;
      
      if (a_release && b_release) { 
        return <any>new Date(b_release) - <any>new Date(a_release); 
      }

      if (a_release && !b_release) { return -1; }
      if (b_release && !a_release) { return 1; }

      return 0;
      
    });
  }

  ngOnInit() {

    const product = this.route.snapshot.paramMap.get("id");
    this.product = product;

    this.store.dispatch(
      new FetchReleases(product));

    let getReleases = createSelector(
      ({products:{releases}}) => releases,
      (releases,{name}) => releases[name]);

    this.releases$ = this.store.pipe(
      select(getReleases,{name: product}));

  }

  openBottomSheet(product, release){

    let ref = this.sheet.open(
      ReleaseActionsComponent,
      {data: {product,release}});

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)).subscribe(
        e => ref.dismiss());

  }

}
