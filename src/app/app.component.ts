import { Component } from '@angular/core';
import {MatBottomSheet} from '@angular/material';
import {ProductActionsComponent} from './product-actions/product-actions.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  products = [
    {name: "RMAD/FE"},
    {name: "RMAZ"},
    {name: "QMMP"}
  ]  

  constructor(private sheet: MatBottomSheet){}

  openBottomSheet(){
    this.sheet.open(ProductActionsComponent);
  }

}
