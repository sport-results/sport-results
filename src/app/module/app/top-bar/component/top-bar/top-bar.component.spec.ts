import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarComponent } from './top-bar.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TopBarService } from './top-bar.service';
import { of } from 'rxjs';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let componentServiceMock: unknown;

  beforeEach(async () => {
    componentServiceMock = {
      init$: () => of({}),
    };

    TestBed.overrideComponent(TopBarComponent, {
      set: {
        providers: [{ provide: TopBarService, useValue: componentServiceMock }],
      },
    });

    await TestBed.configureTestingModule({
      declarations: [TopBarComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
