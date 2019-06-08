import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReleaseActionsComponent } from './release-actions.component';

import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../material.module";

describe('ReleaseActionsComponent', () => {
  let component: ReleaseActionsComponent;
  let fixture: ComponentFixture<ReleaseActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseActionsComponent ],
      imports: [MaterialModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
