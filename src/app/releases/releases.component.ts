import { Component, OnInit } from '@angular/core';
import { JiraService } from '../jira.service'

import { ActivatedRoute } from '@angular/router'
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

import {MatBottomSheet} from '@angular/material';
import {ReleaseActionsComponent} from '../release-actions/release-actions.component';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {

  releases:any;

  constructor(
    private router: Router,
    private jiraSvc: JiraService,
    private sheet: MatBottomSheet,
    private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.jiraSvc.getVersions(id).subscribe(
      releases => {
        this.releases = releases;});
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
