import {
  NO_ERRORS_SCHEMA,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageComponent } from './admin-page.component';
import { provideRouter } from '@angular/router';
import { AdminPageService } from './admin-page.service';
import { of } from 'rxjs';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;
  let componentServiceMock: unknown;

  beforeEach(() => {
    componentServiceMock = {
      init$: jest.fn(),
      adminPageViewModel$: of({})
    };
  });

  beforeEach(async () => {
    TestBed.overrideComponent(AdminPageComponent, {
      set: {
        providers: [
          { provide: AdminPageService, useValue: componentServiceMock },
        ],
      },
    });

    await TestBed.configureTestingModule({
      declarations: [AdminPageComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideRouter([]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPageComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
