import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SportPlayerDataServiceImpl } from './sport-player-data.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('SportPlayerDataServiceImpl', () => {
  let service: SportPlayerDataServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        SportPlayerDataServiceImpl,
      ],
    });

    service = TestBed.inject(SportPlayerDataServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
