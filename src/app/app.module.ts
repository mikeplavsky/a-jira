import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { ProductActionsComponent } from './product-actions/product-actions.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { ReleasesComponent } from './releases/releases.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ReleaseActionsComponent } from './release-actions/release-actions.component';
import { ProductComponent } from './product/product.component'
import {MatCardModule} from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects'
import { productReducer } from './product-reducer'

@NgModule({
  declarations: [
    AppComponent,
    ProductActionsComponent,
    ReleasesComponent,
    ProductsComponent,
    ReleaseActionsComponent,
    ProductComponent
  ],
  entryComponents: [
    ProductActionsComponent,
    ReleaseActionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBottomSheetModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
