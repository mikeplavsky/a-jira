import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatCardModule
  ]
})
export class MaterialModule { }
