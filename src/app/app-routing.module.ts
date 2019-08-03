import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ReleasesComponent} from './releases/releases.component';
import {ProductsComponent} from './products/products.component';
import {EpicsComponent} from './epics/epics.component';
import { StoriesComponent } from './stories/stories.component';
import { SprintComponent } from './sprint/sprint.component';

const routes: Routes = [
  {path: "",redirectTo:"products", pathMatch: 'full'},
  {path: "products/:id/releases", component: ReleasesComponent},
  {path: "products/:p/sprint", component: SprintComponent},
  {path: "products/:p/releases/:r/epics", component: EpicsComponent},
  {path: "products/:p/releases/:r/epics/:e/stories", component: StoriesComponent},
  {path: "products", component: ProductsComponent},
  {path: "**",redirectTo:"products"},
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
