import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-story-actions',
  templateUrl: './story-actions.component.html',
  styleUrls: ['./story-actions.component.css']
})
export class StoryActionsComponent implements OnInit {

  actions = [{name:"Stories", icon: "list"}]

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data) {}

  ngOnInit(): void {
  }

}
