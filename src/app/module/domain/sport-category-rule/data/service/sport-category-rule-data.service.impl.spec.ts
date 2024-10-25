import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SportCategoryRuleDataServiceImpl } from './sport-category-rule-data.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('SportCategoryRuleDataServiceImpl', () => {
  let service: SportCategoryRuleDataServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        SportCategoryRuleDataServiceImpl,
      ],
    });

    service = TestBed.inject(SportCategoryRuleDataServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
