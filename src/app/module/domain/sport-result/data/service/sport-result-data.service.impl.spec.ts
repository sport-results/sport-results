import {
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SportResultDataServiceImpl } from './sport-result-data.service.impl';

describe('SportResultDataServiceImpl', () => {
    let service: SportResultDataServiceImpl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SportResultDataServiceImpl],
        });

        service = TestBed.inject(SportResultDataServiceImpl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
