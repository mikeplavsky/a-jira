import {createAction, props, Action} from '@ngrx/store'

export const FetchProduct = createAction(
    "Fetch Product",
    props<{product:string}>()
); 

export const FetchProductDone = createAction(
     "Fetch Product Done");

export enum ReleasesActionTypes {
    Fetch = "Fetch Releases",
    FetchDone = "Fetch Releases Done"    
}

export class FetchReleases implements Action {
    type: string = ReleasesActionTypes.Fetch;
    constructor(public product:string){}
}

export class FetchReleasesDone implements Action {
    type: string = ReleasesActionTypes.FetchDone;
}

export enum ReleaseStatsActionTypes {
    Fetch = "Fetch Release Stats",
    FetchDone = "Fetch Release Stats Done"    
}

export class FetchReleaseStats implements Action {
    type: string = ReleaseStatsActionTypes.Fetch;
    constructor(public product, public release){}
}

export class FetchReleaseStatsDone implements Action {
    type: string = ReleaseStatsActionTypes.FetchDone;
}

export enum EpicsActionTypes {
    Fetch = "Fetch Epics",
    FetchDone = "Fetch Epics Done"    
}

export class FetchEpics implements Action {
    type: string = EpicsActionTypes.Fetch;
    constructor(public product, public release){}
}

export class FetchEpicsDone implements Action {
    type: string = EpicsActionTypes.FetchDone;
}

export enum EpicStatsActionTypes {
    Fetch = "Fetch Epic Stats",
    FetchDone = "Fetch Epic Stats Done"    
}

export class FetchEpicStats implements Action {
    type: string = EpicStatsActionTypes.Fetch;
    constructor(public product, public release, public epic){}
}

export class FetchEpicStatsDone implements Action {
    type: string = EpicStatsActionTypes.FetchDone;
}

export enum StoriesActionTypes {
    Fetch = "Fetch Stories",
    FetchDone = "Fetch Stories Done"    
}

export class FetchStories implements Action {
    type: string = StoriesActionTypes.Fetch;
    constructor(public product, public release, public epic){}
}

export class FetchStoriesDone implements Action {
    type: string = StoriesActionTypes.FetchDone;
}

export enum ReleaseStoriesActionTypes {
    Fetch = "Fetch ReleaseStories",
    FetchDone = "Fetch ReleaseStories Done"    
}

export class FetchReleaseStories implements Action {
    type: string = ReleaseStoriesActionTypes.Fetch;
    constructor(public product, public release){}
}

export class FetchReleaseStoriesDone implements Action {
    type: string = ReleaseStoriesActionTypes.FetchDone;
}

export enum SprintActionTypes {
    Fetch = "Fetch Sprint",
    FetchDone = "Fetch Sprint Done"    
}

export class FetchSprint implements Action {
    type: string = SprintActionTypes.Fetch;
    constructor(public product){}
}

export class FetchSprintDone implements Action {
    type: string = SprintActionTypes.FetchDone;
}

export enum QueryActionTypes {
    Fetch = "Fetch Query",
    FetchDone = "Fetch Query Done",    
    ClearQuery = "Clear Query"    
}

export class FetchQuery implements Action {
    type: string = QueryActionTypes.Fetch;
    constructor(public product, public query){}
}

export class FetchQueryDone implements Action {
    type: string = QueryActionTypes.FetchDone;
}

export class ClearQuery implements Action {
    type: string = QueryActionTypes.ClearQuery;
    constructor(public product){}
}

export function releaseStoriesReducer(state={}, action){

    if (action.type == ReleaseStoriesActionTypes.FetchDone) {
        
       return {
            ...state,
            [action.product]: {
                ...state[action.product],
                [action.release]: action.payload['issues']
                }
            }
        };
        
    return state;
}

export function queriesReducer(state={}, action){

    if (action.type == QueryActionTypes.FetchDone) {
        return { 
            ...state, 
            [action.product]: {
                done: true,
                stories:action.payload['issues']}};}

    if (action.type == QueryActionTypes.ClearQuery) {
        return { 
            ...state, 
            [action.product]: {
                done: false,
                stories:[]}};}

    return state;            
}

export function sprintsReducer(state={sprint:{}}, action){

    if (action.type == SprintActionTypes.FetchDone) {
        return { 
            ...state, 
            [action.product]: action.payload['issues']};}

    return state;            
}

export function productReducer(state={releases:{}}, action){

    if (action.type == FetchProductDone.type) {
        return { 
            ...state, 
            [action.product]: action.payload};}

    if (action.type == ReleasesActionTypes.FetchDone) {
        return { 
            ...state, 
            releases: {
                ...state.releases,
                [action.product]: action.payload.reduce((a,v)=>{
                    a[v.name] = v;
                    return a;
                },{})}};}

    return state;            
}

export function releaseStatsReducer(state={}, action){

    if (action.type == ReleaseStatsActionTypes.FetchDone) {
       return {
            ...state,
            [action.product]: {
                ...state[action.product],
                [action.release]: action.payload
            }
        };
    }
    return state;
}

export function epicsReducer(state={}, action){

    if (action.type == EpicsActionTypes.FetchDone) {
       return {
            ...state,
            [action.product]: {
                ...state[action.product],
                [action.release]: action.payload.reduce(
                    (res,epic) => {res[epic]={stats:null};return res},
                    {}
                )
            }
        };
    }

    if (action.type == EpicStatsActionTypes.FetchDone ) {
        return {
            ...state,
            [action.product]: {
                ...state[action.product],
                [action.release]: {
                    ...state[action.product][action.release],
                    [action.epic]: action.payload
                }
            }
        };
    }

    return state;
}

export function storiesReducer(state={}, action){

    if (action.type == StoriesActionTypes.FetchDone) {
       
       let get = (product,release) => {
            return state[product] ? state[product][release]: null;  
       }; 
        
       return {
            ...state,
            [action.product]: {
                ...state[action.product],
                [action.release]: { 
                    ...get(action.product,action.release),
                    [action.epic]: action.payload['issues']
                }
            }
        };
    }
    return state;
    
}