import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {map} from 'rxjs/operators'

@Injectable()
export class AppEffects {

  @Effect()
  loadProduct$ = this.actions$.pipe( 
    ofType('Fetch Product'),
    map(v => {
      return {type: 'Fetch Product Done', payload: {a:12}}
    }));

  constructor(private actions$: Actions) {}

}
