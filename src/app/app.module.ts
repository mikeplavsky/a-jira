import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReleasesComponent } from './releases/releases.component';
import { ReleaseComponent } from './release/release.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects'
import { productReducer, releaseStatsReducer, epicsReducer, storiesReducer, sprintsReducer, queriesReducer, releaseStoriesReducer } from './product-reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MaterialModule } from './material.module';
import { EpicsComponent } from './epics/epics.component';
import { EpicComponent } from './epic/epic.component';
import { StoriesComponent } from './stories/stories.component';
import { StoryComponent } from './story/story.component';
import { SprintComponent } from './sprint/sprint.component';
import { SearchComponent } from './search/search.component';
import { ReleaseStoriesComponent } from './release-stories/release-stories.component';
import { StoryActionsComponent } from './story-actions/story-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    ReleasesComponent,
    ProductsComponent,
    ProductComponent,
    ReleaseComponent,
    EpicsComponent,
    EpicComponent,
    StoriesComponent,
    StoryComponent,
    SprintComponent,
    SearchComponent,
    ReleaseStoriesComponent,
    StoryActionsComponent
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    StoreModule.forRoot({
      products:productReducer, 
      releases:releaseStatsReducer,
      epics:epicsReducer,
      stories:storiesReducer,
      releaseStories:releaseStoriesReducer,
      sprints:sprintsReducer,
      queries:queriesReducer}),

    EffectsModule.forRoot([AppEffects]),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
