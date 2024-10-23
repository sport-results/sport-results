import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { ApplicationStoreService } from '@app/api/core/application';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserDashboardComponent } from '../../../dashboard';

@Component({
  standalone: true,
  template: `<div>MockUserDashboard</div> `,
})
class UserDashboardComponentMock {}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let applicationStoreServiceMock: unknown;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(() => {
    applicationStoreServiceMock = {
      selectAuthenticatedUser$: () => of({}),
    };

    TestBed.overrideComponent(UserProfileComponent, {
        remove: { imports: [UserDashboardComponent] },
        add: { imports: [UserDashboardComponentMock] },
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent],
      providers: [
        provideRouter([]),
        {
          provide: ApplicationStoreService,
          useValue: applicationStoreServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
