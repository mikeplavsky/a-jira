import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {withLatestFrom, filter} from 'rxjs/operators';

import { 
  FetchProduct, 
  FetchProductDone, 
  ReleasesActionTypes,
  FetchReleases,
  ReleaseStatsActionTypes,
  FetchReleaseStats,
  EpicsActionTypes,
  FetchEpics,
  EpicStatsActionTypes,
  FetchEpicStats,
  StoriesActionTypes,
  FetchStories,
  SprintActionTypes,
  FetchSprint,
  QueryActionTypes,
  FetchQuery,
  ReleaseStoriesActionTypes,
  FetchReleaseStories} from './product-reducer'
import {map, mergeMap, switchMap, concatMap} from 'rxjs/operators'
import {JiraService} from './jira.service'

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private jiraSvc: JiraService,
    private store$: Store<{epics,products,releases}>) {}

  @Effect()
  loadQuery$ = this.actions$.pipe(
    ofType(QueryActionTypes.Fetch),
    switchMap(
    ({product,query}) => this.jiraSvc.getQuery(product,query).pipe(
        map(v => ({
            product,
            query,
            type: QueryActionTypes.FetchDone,
            payload: v
          })))));

  @Effect()
  loadSprint$ = this.actions$.pipe(
    ofType(SprintActionTypes.Fetch),
    switchMap(({product})=> this.jiraSvc.getSprint(product).pipe(
        map(v => ({
            product,
            type: SprintActionTypes.FetchDone,
            payload: v
          })))));

  @Effect()
  loadReleaseStories$ = this.actions$.pipe(
    ofType(ReleaseStoriesActionTypes.Fetch),
    switchMap(({product,release}) => 
      this.jiraSvc.getReleaseStories(product,release).pipe(
        map(v => ({
            product,
            release,
            type: ReleaseStoriesActionTypes.FetchDone,
            payload: v
          })))));

  @Effect()
  loadStories$ = this.actions$.pipe(
    ofType(StoriesActionTypes.Fetch),
    switchMap(({product,release,epic}) =>
      this.jiraSvc.getEpicStories(
        product,
        release,
        epic).pipe(
        map(v => ({
            product,
            release,
            epic,
            type: StoriesActionTypes.FetchDone,
            payload: v
        })))));

  @Effect()
  loadEpicStats$ = this.actions$.pipe(
    ofType(EpicStatsActionTypes.Fetch),
    mergeMap(({product,release,epic}) => 
      this.jiraSvc.getEpicStats(
        product,release,epic).pipe(
        map(v => ({
            product,
            release,
            epic,
            type: EpicStatsActionTypes.FetchDone,
            payload: v
        })))));

  @Effect()
  loadEpics$ = this.actions$.pipe(
    ofType(EpicsActionTypes.Fetch),
    withLatestFrom(this.store$),
    filter(([{product,release}, {epics}]) => {

        let p = epics[product];
        let res = p ? p[release]: null;

        return res == null;

    }),
    switchMap(([{product,release}, store]) =>
      this.jiraSvc.getReleaseEpics(product,release).pipe(
        concatMap((v:[any]) => {
          
          let epics = v.map(e => new FetchEpicStats(
            product,release,e
          ));

          return [{
            product,
            release,
            type: EpicsActionTypes.FetchDone,
            payload: v
          },
          ...epics];

      }))));

  @Effect()
  loadReleaseStats$ = this.actions$.pipe(
    ofType(ReleaseStatsActionTypes.Fetch),
    withLatestFrom(this.store$),
    filter(([{product,release},{releases}]) => {
        
        let p = releases[product];
        let res = p ? p[release] : null;
        
        return p == null;

    }),
    mergeMap(([{product,release},store]) =>
      this.jiraSvc.getReleaseStats(product,release).pipe(
        map(v => ({
            product,
            release,
            type: ReleaseStatsActionTypes.FetchDone,
            payload: v
        })))));

  @Effect()
  loadReleases$ = this.actions$.pipe(
    ofType(ReleasesActionTypes.Fetch),
    withLatestFrom(this.store$),
    filter(([{product},{products}]) => {
      return products.releases[product] == null;
    }),
    switchMap(([{product},store]) => 
      this.jiraSvc.getVersions(product).pipe(
        map(v => ({
            product: product,
            type: ReleasesActionTypes.FetchDone,
            payload: v
        })))));

  @Effect()
  loadProduct$ = this.actions$.pipe( 
    ofType(FetchProduct),
    mergeMap(({product}) =>
       this.jiraSvc.getVelocity(product).pipe(
        map(v => ({
            product: product,
            type: FetchProductDone.type, 
            payload: v
        })))));

}
