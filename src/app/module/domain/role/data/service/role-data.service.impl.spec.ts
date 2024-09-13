import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RoleDataServiceImpl } from './role-data.service.impl';

describe('RoleDataServiceImpl', () => {
    let service: RoleDataServiceImpl;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RoleDataServiceImpl],
        });

        service = TestBed.inject(RoleDataServiceImpl);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
