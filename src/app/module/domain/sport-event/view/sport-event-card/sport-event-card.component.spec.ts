import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportEventCardComponent } from './sport-event-card.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { AuthorizationService } from '@app/api/core/authorization';
import { ConfirmationService } from 'primeng/api';
import { EntityStoreService } from '@app/api/core/entity';
import { SportEventStoreService } from '@app/api/domain/sport-event';
import { provideRouter } from '@angular/router';

describe('SportEventCardComponent', () => {
  let component: SportEventCardComponent;
  let fixture: ComponentFixture<SportEventCardComponent>;
  let authorizationServiceMock: unknown;
  let confirmationServiceMock: unknown;
  let sportEventStoreServiceMock: unknown;

  beforeEach(async () => {
    authorizationServiceMock = { generatePermissionName: () => '' };
    confirmationServiceMock = {};
    sportEventStoreServiceMock = {};

    await TestBed.configureTestingModule({
      imports: [SportEventCardComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: AuthorizationService,
          useValue: authorizationServiceMock,
        },
        {
          provide: ConfirmationService,
          useValue: confirmationServiceMock,
        },
        {
          provide: SportEventStoreService,
          useValue: sportEventStoreServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SportEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
