import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ProductActionTypes, 
  FetchProduct, 
  ReleasesActionTypes,
  FetchReleases } from './product-reducer'
import {map, mergeMap} from 'rxjs/operators'
import {JiraService} from './jira.service'

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private jiraSvc: JiraService) {}

  @Effect()
  loadReleases$ = this.actions$.pipe(
    ofType(ReleasesActionTypes.Fetch),
    mergeMap((a:FetchReleases)=>{

      return this.jiraSvc.getVersions(a.product).pipe(
        map( v => {
          return {
            product: a.product,
            type: ReleasesActionTypes.FetchDone,
            payload: v

  }}));}));

  @Effect()
  loadProduct$ = this.actions$.pipe( 
    ofType(ProductActionTypes.Fetch),
    mergeMap((a:FetchProduct) => {
      return this.jiraSvc.getVelocity(a.product).pipe(
        map(v => { 
          return {
            product: a.product,
            type: ProductActionTypes.FetchDone, 
            payload: v

  }}))}));

}
