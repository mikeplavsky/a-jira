import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReleaseComponent } from './release.component';

import { MaterialModule } from "../material.module";
import { StoreModule } from '@ngrx/store';

describe('ReleaseComponent', () => {
  let component: ReleaseComponent;
  let fixture: ComponentFixture<ReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseComponent ],
      imports: [ MaterialModule, StoreModule.forRoot( {} )]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseComponent);
    component = fixture.componentInstance;

    component.release = {name: '8.1'};

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
