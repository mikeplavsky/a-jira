import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})

export class StoryComponent implements OnInit {

  jira_url = "https://jira.labs.quest.com/browse";

  @Input() product;
  @Input() story;
  
  constructor() { }
  
  sprints(){

    let s = this.story['fields']['customfield_12004']
    let res = s.map(v => v.match(/Sprint ([\d]*)/i)[1])

    return res.join(",");

  }

  versions() {
    let vs = this.story['fields']['fixVersions'];
    return vs.map((v) => v["name"]).join(",");
  }

  points() {
    
    let ps = this.story['fields']['customfield_10303']
    
    let n = parseInt(ps);
    let pts = "points"; 
    
    if (n == 1) { 
      pts = "point"; 
    }

    return `${n} ${pts}` 

  } 

  ngOnInit() {
  }

}
