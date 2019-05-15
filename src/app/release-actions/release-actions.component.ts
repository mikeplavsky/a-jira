import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-release-actions',
  templateUrl: './release-actions.component.html',
  styleUrls: ['./release-actions.component.css']
})
export class ReleaseActionsComponent implements OnInit {

  actions = [
   {name:"Stories", icon: "build"},
   {name:"Epics", icon: "track_changes"}]

  constructor() {}

  ngOnInit() {
  }

  getActions(){
    return this.actions; 
  }
}
