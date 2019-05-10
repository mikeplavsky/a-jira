import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ReleasesComponent } from './releases/releases.component';

const routes: Routes = [
  {path: "releases", component: ReleasesComponent}
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
