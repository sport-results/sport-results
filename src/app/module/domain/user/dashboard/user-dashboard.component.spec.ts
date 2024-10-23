import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardService } from './user-dashboard.service';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let componentServiceMock: unknown;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async () => {
    componentServiceMock = {
      init$: jest.fn(),
      userDashboardViewModel$$$: jest.fn(),
    };

    TestBed.overrideComponent(UserDashboardComponent, {
      set: {
        providers: [
          { provide: UserDashboardService, useValue: componentServiceMock },
        ],
      },
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
