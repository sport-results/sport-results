import { TestBed } from '@angular/core/testing';

import { ApplicationStoreServiceImpl } from './application-store.service.impl';

describe('ApplicationStoreServiceImpl', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ApplicationStoreServiceImpl = TestBed.inject(
            ApplicationStoreServiceImpl
        );

        expect(service).toBeTruthy();
    });
});
