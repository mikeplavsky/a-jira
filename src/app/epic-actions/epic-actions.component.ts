import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-epic-actions',
  templateUrl: './epic-actions.component.html',
  styleUrls: ['./epic-actions.component.css']
})
export class EpicActionsComponent implements OnInit {

  actions = [{name:"Stories", icon: "build"}]

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data) {}
  
  ngOnInit() {
  }

  getActions(){
    return this.actions.map( x => {
      return {...x,
        product:this.data.product,
        release:this.data.release,
        epic:this.data.epic}
    }); 
  }

}
