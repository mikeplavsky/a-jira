import {Action} from '@ngrx/store'

export class Fetch implements Action {
    type: string = "fetch";
}

export const initialState = {}
export function productReducer(state=initialState, action){
    if (action.type == "fetch") {
        return {RMADFE: {velocity: 24}};
    }
    return state;
}