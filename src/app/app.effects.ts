import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

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
import {map, mergeMap, concatMap} from 'rxjs/operators'
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
  loadQuery$ = this.pipe(
    QueryActionTypes.Fetch,
    ({product,query})=>{
      return this.jiraSvc.getQuery(product,query).pipe(
        map(v => {
          return {
            product,
            query,
            type: QueryActionTypes.FetchDone,
            payload: v
  }}));});

  @Effect()
  loadSprint$ = this.pipe(
    SprintActionTypes.Fetch,
    ({product})=>{
      return this.jiraSvc.getSprint(product).pipe(
        map(v => {
          return {
            product,
            type: SprintActionTypes.FetchDone,
            payload: v
  }}));});

  @Effect()
  loadReleaseStories$ = this.pipe(
    ReleaseStoriesActionTypes.Fetch,
    ({product,release})=>{
      return this.jiraSvc.getReleaseStories(product,release).pipe(
        map(v => {
          return {
            product,
            release,
            type: ReleaseStoriesActionTypes.FetchDone,
            payload: v
  }}));});

  @Effect()
  loadStories$ = this.pipe(
    StoriesActionTypes.Fetch,
    ({product,release,epic})=>{
      return this.jiraSvc.getEpicStories(
        product,
        release,
        epic).pipe(
        map(v => { 
          return {
            product,
            release,
            epic,
            type: StoriesActionTypes.FetchDone,
            payload: v}
        }))});

  @Effect()
  loadEpicStats$ = this.pipe(
    EpicStatsActionTypes.Fetch,
    ({product,release,epic})=>{
      return this.jiraSvc.getEpicStats(
        product,release,epic).pipe(
        map(v => {
          return {
            product,
            release,
            epic,
            type: EpicStatsActionTypes.FetchDone,
            payload: v
  }}));});

  @Effect()
  loadEpics$ = this.pipe(
    EpicsActionTypes.Fetch,
    ({product,release})=>{
      return this.jiraSvc.getReleaseEpics(product,release).pipe(
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

      }))});

  @Effect()
  loadReleaseStats$ = this.pipe(
    ReleaseStatsActionTypes.Fetch,
    ({product,release})=>{
      return this.jiraSvc.getReleaseStats(product,release).pipe(
        map(v => {
          return {
            product,
            release,
            type: ReleaseStatsActionTypes.FetchDone,
            payload: v
  }}));});

  @Effect()
  loadReleases$ = this.pipe(
    ReleasesActionTypes.Fetch,
    ({product})=>{
      return this.jiraSvc.getVersions(product).pipe(
        map(v => {
          return {
            product: product,
            type: ReleasesActionTypes.FetchDone,
            payload: v
  }}));});

  @Effect()
  loadProduct$ = this.pipe( 
    FetchProduct,
    ({product}) => {
      return this.jiraSvc.getVelocity(product).pipe(
        map(v => { 
          return {
            product: product,
            type: FetchProductDone.type, 
            payload: v
  }}))});

}
