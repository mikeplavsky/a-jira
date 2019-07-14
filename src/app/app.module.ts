import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProductActionsComponent } from './product-actions/product-actions.component';
import { ReleasesComponent } from './releases/releases.component';
import { ReleaseComponent } from './release/release.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ReleaseActionsComponent } from './release-actions/release-actions.component';
import { ProductComponent } from './product/product.component'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects'
import { productReducer, releaseStatsReducer, epicsReducer } from './product-reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MaterialModule } from './material.module';
import { EpicsComponent } from './epics/epics.component'

@NgModule({
  declarations: [
    AppComponent,
    ProductActionsComponent,
    ReleasesComponent,
    ProductsComponent,
    ReleaseActionsComponent,
    ProductComponent,
    ReleaseComponent,
    EpicsComponent
  ],
  entryComponents: [
    ProductActionsComponent,
    ReleaseActionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    StoreModule.forRoot({
      products:productReducer, 
      releases:releaseStatsReducer,
      epics:epicsReducer}),

    EffectsModule.forRoot([AppEffects]),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
