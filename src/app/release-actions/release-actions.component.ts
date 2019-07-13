import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet'

@Component({
  selector: 'app-release-actions',
  templateUrl: './release-actions.component.html',
  styleUrls: ['./release-actions.component.css']
})
export class ReleaseActionsComponent implements OnInit {

  actions = [
   {name:"Stories", icon: "build"},
   {name:"Epics", icon: "track_changes"}]

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data) {}

  ngOnInit() {
  }

  getActions(){
    return this.actions.map( x => {
      return {...x,
        product:this.data.product,
        release:this.data.release}
    }); 
  }
}
