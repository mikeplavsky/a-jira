import { Component, OnInit } from '@angular/core';
import { JiraService } from '../jira.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {

  product:any;
  releases:any;

  constructor(
    private jiraSvc: JiraService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.jiraSvc.getVersions(id).subscribe(
      releases => {
        console.log(releases);
        this.releases = releases;});
  }

}
