import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ReleasesComponent} from './releases/releases.component';
import {ProductsComponent} from './products/products.component';

const routes: Routes = [
  {path: "",redirectTo:"products", pathMatch: 'full'},
  {path: "releases", component: ReleasesComponent},
  {path: "products", component: ProductsComponent}
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
