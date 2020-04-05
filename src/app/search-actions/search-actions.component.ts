import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-search-actions',
  templateUrl: './search-actions.component.html',
  styleUrls: ['./search-actions.component.css']
})
export class SearchActionsComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data) {}

  ngOnInit(): void {
  }

}
