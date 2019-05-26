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

export const initialState = {
    releases: {}
}

export function productReducer(state=initialState, action){

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