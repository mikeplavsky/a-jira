import {Action} from '@ngrx/store'

export enum ProductActionTypes {
    Fetch = "Fetch Product",
    FetchDone = "Fetch Product Done"    
}

export enum ReleasesActionTypes {
    Fetch = "Fetch Releases",
    FetchDone = "Fetch Releases Done"    
}

export class FetchProduct implements Action {
    type: string = ProductActionTypes.Fetch;
    constructor(public name:string){}
}

export class FetchProductDone implements Action {
    type: string = ProductActionTypes.FetchDone;
}

export class FetchReleases implements Action {
    type: string = ReleasesActionTypes.Fetch;
    constructor(public product:string){}
}

export class FetchReleasesDone implements Action {
    type: string = ReleasesActionTypes.FetchDone;
    constructor(public product:string){}
}

export const initialState = {
    releases: {}
}

export function productReducer(state=initialState, action){

    if (action.type == ProductActionTypes.FetchDone) {
        return { 
            ...state, 
            [action.name]: action.payload};}

    if (action.type == ReleasesActionTypes.FetchDone) {
        return { 
            ...state, 
            releases: {
                ...state.releases,
                [action.name]: action.payload}};}

    return state;

}