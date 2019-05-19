import {Action} from '@ngrx/store'

export enum ProductActionTypes {
    Fetch = "Fetch Product",
    FetchDone = "Fetch Product Done"    
}

export class FetchProduct implements Action {
    type: string = ProductActionTypes.Fetch;
    constructor(public name:string){}
}

export class FetchProductDone implements Action {
    type: string = ProductActionTypes.FetchDone;
}

export const initialState = {}

export function productReducer(state=initialState, action){

    if (action.type == ProductActionTypes.FetchDone) {
        state[action.name] = action.payload;
    }

    return state;

}