import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesComponent } from './releases.component';
import { ReleaseComponent } from '../release/release.component';
import { MaterialModule } from '../material.module';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReleasesComponent', () => {

  let component: ReleasesComponent;
  let fixture: ComponentFixture<ReleasesComponent>;
  let store: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReleasesComponent, 
        provideMockStore({ initialState: {
          releases: {}
        }}), 
        ReleaseComponent ],
      imports: [ 
        MaterialModule,
        RouterTestingModule ]
    })
    .compileComponents();
    
    store = TestBed.get(Store);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
