import { TestBed } from '@angular/core/testing';

import { EntityDataServiceImpl } from './entity-data.service.impl';

describe('EntityDataServiceImpl', () => {
    let service: EntityDataServiceImpl;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EntityDataServiceImpl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
