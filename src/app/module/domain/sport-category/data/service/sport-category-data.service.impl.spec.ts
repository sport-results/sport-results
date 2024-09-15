import {
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SportCategoryDataServiceImpl } from './sport-category-data.service.impl';

describe('SportCategoryDataServiceImpl', () => {
    let service: SportCategoryDataServiceImpl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SportCategoryDataServiceImpl],
        });

        service = TestBed.inject(SportCategoryDataServiceImpl);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
