import { TestBed } from '@angular/core/testing';

import { EntityDataServiceImpl } from './entity-data.service.impl';
import { DataEngine } from '@app/api/engine';

describe('EntityDataServiceImpl', () => {
  let service: EntityDataServiceImpl;
  let dataEngineMock: unknown;

  beforeEach(() => {
    dataEngineMock = {};
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EntityDataServiceImpl,
        { provide: DataEngine, useValue: dataEngineMock },
      ],
    });
    service = TestBed.inject(EntityDataServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
