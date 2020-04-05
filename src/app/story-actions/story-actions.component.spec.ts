import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryActionsComponent } from './story-actions.component';

describe('StoryActionsComponent', () => {
  let component: StoryActionsComponent;
  let fixture: ComponentFixture<StoryActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
