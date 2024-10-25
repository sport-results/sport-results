import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SportEventDataServiceImpl } from './sport-event-data.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('SportEventDataServiceImpl', () => {
  let service: SportEventDataServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        SportEventDataServiceImpl,
      ],
    });

    service = TestBed.inject(SportEventDataServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
