import {
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SportPlayerDataServiceImpl } from './sport-player-data.service.impl';

describe('SportPlayerDataServiceImpl', () => {
    let service: SportPlayerDataServiceImpl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SportPlayerDataServiceImpl],
        });

        service = TestBed.inject(SportPlayerDataServiceImpl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
