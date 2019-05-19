import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ProductActionTypes, FetchProduct } from './product-reducer'
import {map, mergeMap} from 'rxjs/operators'
import {JiraService} from './jira.service'

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private jiraSvc: JiraService) {}

  @Effect()
  loadProduct$ = this.actions$.pipe( 
    ofType(ProductActionTypes.Fetch),
    mergeMap((a:FetchProduct) => {
      return this.jiraSvc.getVelocity(a.name).pipe(
        map(v => { 
          return {
            name: a.name,
            type: ProductActionTypes.FetchDone, 
            payload: v}}))}));

}
