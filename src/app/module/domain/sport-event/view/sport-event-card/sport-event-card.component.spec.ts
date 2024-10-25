import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportEventCardComponent } from './sport-event-card.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('SportEventCardComponent', () => {
  let component: SportEventCardComponent;
  let fixture: ComponentFixture<SportEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SportEventCardComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SportEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
