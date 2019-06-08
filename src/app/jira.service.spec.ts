import { TestBed } from '@angular/core/testing';
import { JiraService } from './jira.service';

import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('JiraService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: JiraService = TestBed.get(JiraService);
    expect(service).toBeTruthy();
  });
});
