import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SportCategoryDataServiceImpl } from './sport-category-data.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('SportCategoryDataServiceImpl', () => {
  let service: SportCategoryDataServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        SportCategoryDataServiceImpl,
      ],
    });

    service = TestBed.inject(SportCategoryDataServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
