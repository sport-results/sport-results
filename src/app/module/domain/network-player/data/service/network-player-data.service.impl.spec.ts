import {
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NetworkPlayerDataServiceImpl } from './network-player-data.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('NetworkPlayerDataServiceImpl', () => {
    let service: NetworkPlayerDataServiceImpl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
              provideExperimentalZonelessChangeDetection(),
              NetworkPlayerDataServiceImpl],
        });

        service = TestBed.inject(NetworkPlayerDataServiceImpl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
