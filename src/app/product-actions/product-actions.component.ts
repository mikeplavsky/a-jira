import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.css']
})
export class ProductActionsComponent implements OnInit {

  actions = [
   {name:"Sprint", icon: "rowing"},
   {name:"Velocity", icon: "motorcycle"},
   {name:"Epics", icon: "track_changes"},
   {name:"Releases", icon: "build"}]

  constructor() { }

  ngOnInit() {
  }

}
