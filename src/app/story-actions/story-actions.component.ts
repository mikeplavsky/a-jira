import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-story-actions',
  templateUrl: './story-actions.component.html',
  styleUrls: ['./story-actions.component.css']
})
export class StoryActionsComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data,
    private sheet: MatBottomSheetRef<StoryActionsComponent>) {}

  encode(s) {
    return encodeURIComponent(s);
  }

  openLink(event) {
    this.sheet.dismiss();
  }

  ngOnInit(): void {
  }

}
