import { TestBed } from '@angular/core/testing';

import { UserUtilServiceImpl } from './user-util.service.impl';

describe('UserUtilServiceImpl', () => {
	let service: UserUtilServiceImpl;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UserUtilServiceImpl);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
