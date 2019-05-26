import { Component, OnInit } from '@angular/core';
import { JiraService } from '../jira.service'

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

  releases:any;
  releases$:any;

  constructor(private store: Store<{}>,
    private router: Router,
    private jiraSvc: JiraService,
    private sheet: MatBottomSheet,
    private route: ActivatedRoute) {}

  ngOnInit() {

    const product = this.route.snapshot.paramMap.get("id");

    this.store.dispatch(
      new FetchReleases(product));

    let getReleases = createSelector(
      (state: {products:{releases}},props:{name}) => {
        return state.products.releases[props.name];});

    this.releases$ = this.store.pipe(
      select(getReleases,{name: product}));

    /*this.jiraSvc.getVersions(product).subscribe(
      releases => {
        this.releases = releases;});*/

  }

  openBottomSheet(release:any){

    let ref = this.sheet.open(
      ReleaseActionsComponent,
      {data: {...release}});

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)).subscribe(
        e => ref.dismiss());

  }

}
