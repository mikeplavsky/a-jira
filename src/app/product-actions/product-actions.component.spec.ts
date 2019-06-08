import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductActionsComponent } from './product-actions.component';
import { RouterTestingModule } from "@angular/router/testing";

import { MaterialModule } from '../material.module';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet'

describe('ProductActionsComponent', () => {
  let component: ProductActionsComponent;
  let fixture: ComponentFixture<ProductActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductActionsComponent ],
      providers: [{
        provide: MAT_BOTTOM_SHEET_DATA,
        useValue: {}
      }],
      imports: [ RouterTestingModule, MaterialModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
