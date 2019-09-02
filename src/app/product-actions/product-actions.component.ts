import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet'

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.css']
})
export class ProductActionsComponent implements OnInit {

  actions = [
   {name:"Sprint", icon: "rowing"},
   {name:"Releases", icon: "build"},
   {name:"Search", icon: "search"}]

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  ngOnInit() {
  }

  getActions(){
    return this.actions.map(
      x => {
        return {...x,id:this.data.name}});
  }

  click(ev){
    console.log(ev);
  }

}
