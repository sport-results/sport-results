import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvatarComponent } from './user-avatar.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
import { ApplicationStoreService } from '@app/api/core/application';
import { AuthorizationService } from '@app/api/core/authorization';

describe('UserAvatarComponent', () => {
  let component: UserAvatarComponent;
  let fixture: ComponentFixture<UserAvatarComponent>;
  let applicationStoreService: unknown;
  let authorizationService: unknown;

  beforeEach(async () => {
    applicationStoreService = { selectAuthenticatedUser$: () => of({}) };
    authorizationService = {
      hasPermission: () => true,
    };

    await TestBed.configureTestingModule({
      imports: [UserAvatarComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: ApplicationStoreService,
          useValue: applicationStoreService,
        },
        { provide: AuthorizationService, useValue: authorizationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
