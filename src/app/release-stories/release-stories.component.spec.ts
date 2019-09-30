import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseStoriesComponent } from './release-stories.component';

describe('ReleaseStoriesComponent', () => {
  let component: ReleaseStoriesComponent;
  let fixture: ComponentFixture<ReleaseStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
