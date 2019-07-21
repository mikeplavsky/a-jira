import {Action} from '@ngrx/store'

export enum ProductActionTypes {
    Fetch = "Fetch Product",
    FetchDone = "Fetch Product Done"    
}

export class FetchProduct implements Action {
    type: string = ProductActionTypes.Fetch;
    constructor(public product:string){}
}

export class FetchProductDone implements Action {
    type: string = ProductActionTypes.FetchDone;
}

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

export function productReducer(state={releases:{}}, action){

    if (action.type == ProductActionTypes.FetchDone) {
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
                [action.release]: action.payload
            }
        };
    }
    return state;
}

export function epicStatsReducer(state={}, action){

    if (action.type == EpicStatsActionTypes.FetchDone) {
       
       let get = (product,release) => {
            return state[product] ? state[product][release]: null;  
       }; 
        
       return {
            ...state,
            [action.product]: {
                ...state[action.product],
                [action.release]: { 
                    ...get(action.product,action.release),
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