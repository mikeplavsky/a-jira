import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ReleasesComponent} from './releases/releases.component';
import {ProductsComponent} from './products/products.component';
import {EpicsComponent} from './epics/epics.component';
import { StoriesComponent } from './stories/stories.component';
import { SprintComponent } from './sprint/sprint.component';
import { SearchComponent } from './search/search.component';
import { ReleaseStoriesComponent } from './release-stories/release-stories.component';

const routes: Routes = [
  {path: "", component: ProductsComponent, pathMatch: 'full'},
  {path: "products/:id/releases", component: ReleasesComponent},
  {path: "products/:p/sprint", component: SprintComponent},
  {path: "products/:p/search", component: SearchComponent},
  {path: "products/:p/releases/:r/epics", component: EpicsComponent},
  {path: "products/:p/releases/:r/stories", component: ReleaseStoriesComponent},
  {path: "products/:p/releases/:r/epics/:e/stories", component: StoriesComponent},
  {path: "products", component: ProductsComponent},
  {path: "**", component: ProductsComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
