import {
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PermissionDataServiceImpl } from './permission-data.service.impl';

describe('PermissionDataServiceImpl', () => {
    let service: PermissionDataServiceImpl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PermissionDataServiceImpl],
        });

        service = TestBed.inject(PermissionDataServiceImpl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
