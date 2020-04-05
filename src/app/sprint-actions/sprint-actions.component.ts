import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-sprint-actions',
  templateUrl: './sprint-actions.component.html',
  styleUrls: ['./sprint-actions.component.css']
})
export class SprintActionsComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data) {}

  ngOnInit(): void {
  }

}
