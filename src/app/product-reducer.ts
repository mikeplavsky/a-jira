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