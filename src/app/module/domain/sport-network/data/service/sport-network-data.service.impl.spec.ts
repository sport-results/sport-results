import {
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SportNetworkDataServiceImpl } from './sport-network-data.service.impl';

describe('SportNetworkDataServiceImpl', () => {
    let service: SportNetworkDataServiceImpl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SportNetworkDataServiceImpl],
        });

        service = TestBed.inject(SportNetworkDataServiceImpl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
