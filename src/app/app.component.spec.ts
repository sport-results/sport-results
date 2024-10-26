import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { SportCategoryStoreService } from './api/domain/sport-category';
import { SportCategoryRuleStoreService } from './api/domain/sport-category-rule';

describe('AppComponent', () => {
  let sportCategoryStoreServiceMock: unknown;
  let sportCategoryRuleStoreServiceMock: unknown;

  beforeEach(async () => {
    sportCategoryStoreServiceMock = { dispatchListEntitiesAction: jest.fn() };
    sportCategoryRuleStoreServiceMock = {
      dispatchListGroupEntitiesAction: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [AppComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: SportCategoryStoreService,
          useValue: sportCategoryStoreServiceMock,
        },
        {
          provide: SportCategoryRuleStoreService,
          useValue: sportCategoryRuleStoreServiceMock,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it(`should have as title 'sport-results'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.title).toEqual('sport-results');
  });
});
