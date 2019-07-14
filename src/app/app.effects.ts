import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ProductActionTypes, 
  FetchProduct, 
  ReleasesActionTypes,
  FetchReleases,
  ReleaseStatsActionTypes,
  FetchReleaseStats,
  EpicsActionTypes,
  FetchEpics,
  FetchEpicsDone} from './product-reducer'
import {map, mergeMap} from 'rxjs/operators'
import {JiraService} from './jira.service'

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private jiraSvc: JiraService) {}

  pipe(action,srv){
    return this.actions$.pipe(
      ofType(action),
      mergeMap(srv));
  }

  @Effect()
  loadEpics$ = this.pipe(
    EpicsActionTypes.Fetch,
    (a:FetchEpics)=>{
      return this.jiraSvc.getReleaseEpics(a.product,a.release).pipe(
        map(v => {
          return {
            product: a.product,
            release: a.release,
            type: EpicsActionTypes.FetchDone,
            payload: v
  }}));});

  @Effect()
  loadReleaseStats$ = this.pipe(
    ReleaseStatsActionTypes.Fetch,
    (a:FetchReleaseStats)=>{
      return this.jiraSvc.getReleaseStats(a.product,a.release).pipe(
        map(v => {
          return {
            product: a.product,
            release: a.release,
            type: ReleaseStatsActionTypes.FetchDone,
            payload: v
  }}));});

  @Effect()
  loadReleases$ = this.pipe(
    ReleasesActionTypes.Fetch,
    (a:FetchReleases)=>{
      return this.jiraSvc.getVersions(a.product).pipe(
        map(v => {
          return {
            product: a.product,
            type: ReleasesActionTypes.FetchDone,
            payload: v
  }}));});

  @Effect()
  loadProduct$ = this.pipe( 
    ProductActionTypes.Fetch,
    (a:FetchProduct) => {
      return this.jiraSvc.getVelocity(a.product).pipe(
        map(v => { 
          return {
            product: a.product,
            type: ProductActionTypes.FetchDone, 
            payload: v
  }}))});

}
