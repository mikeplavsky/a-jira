import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReleaseActionsComponent } from './release-actions.component';

import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../material.module";

describe('ReleaseActionsComponent', () => {
  let component: ReleaseActionsComponent;
  let fixture: ComponentFixture<ReleaseActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [MaterialModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
  });

  it('should create', () => {
  });
});
