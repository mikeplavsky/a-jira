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
  loadQuery$ = this.pipe(
    QueryActionTypes.Fetch,
    (a:FetchQuery)=>{
      return this.jiraSvc.getQuery(a.product,a.query).pipe(
        map(v => {
          return {
            product: a.product,
            query: a.query,
            type: QueryActionTypes.FetchDone,
            payload: v
  }}));});

  @Effect()
  loadSprint$ = this.pipe(
    SprintActionTypes.Fetch,
    (a:FetchSprint)=>{
      return this.jiraSvc.getSprint(a.product).pipe(
        map(v => {
          return {
            product: a.product,
            type: SprintActionTypes.FetchDone,
            payload: v
  }}));});

  @Effect()
  loadReleaseStories$ = this.pipe(
    ReleaseStoriesActionTypes.Fetch,
    (a:FetchReleaseStories)=>{
      return this.jiraSvc.getReleaseStories(a.product,a.release).pipe(
        map(v => {
          return {
            product: a.product,
            release: a.release,
            type: ReleaseStoriesActionTypes.FetchDone,
            payload: v
  }}));});

  @Effect()
  loadStories$ = this.pipe(
    StoriesActionTypes.Fetch,
    (a:FetchStories)=>{
      return this.jiraSvc.getEpicStories(a.product,a.release,a.epic).pipe(
        map(v => {
          return {
            product: a.product,
            release: a.release,
            epic: a.epic,
            type: StoriesActionTypes.FetchDone,
            payload: v
  }}));});

  @Effect()
  loadEpicStats$ = this.pipe(
    EpicStatsActionTypes.Fetch,
    (a:FetchEpicStats)=>{
      return this.jiraSvc.getEpicStats(
        a.product,a.release,a.epic).pipe(
        map(v => {
          return {
            product: a.product,
            release: a.release,
            epic: a.epic,
            type: EpicStatsActionTypes.FetchDone,
            payload: v
  }}));});

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
