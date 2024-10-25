import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodResultComponent } from './period-result.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('PeriodResultComponent', () => {
  let component: PeriodResultComponent;
  let fixture: ComponentFixture<PeriodResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodResultComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(PeriodResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
