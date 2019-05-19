import {Action} from '@ngrx/store'

export class FetchProduct implements Action {
    type: string = "Fetch Product";
}

export const initialState = {}
export function productReducer(state=initialState, action){
    return state;
}