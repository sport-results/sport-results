import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportEventCardComponent } from './sport-event-card.component';

describe('SportEventCardComponent', () => {
  let component: SportEventCardComponent;
  let fixture: ComponentFixture<SportEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SportEventCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
