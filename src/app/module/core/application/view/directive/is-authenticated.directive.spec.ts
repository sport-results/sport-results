import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IsAuthenticatedDirective } from './is-authenticated.directive';
import { ApplicationStoreService } from '@app/api/core/application';
import { of } from 'rxjs';

@Component({
  template: ` <div *mcIsAuthenticated="true"></div> `,
})
class HostComponent {}

describe('IsAuthenticatedDirective', () => {
  let applicationStoreServiceMock: unknown;
  let fixture: ComponentFixture<HostComponent>;
  let element: HTMLInputElement;

  beforeEach(() => {
    applicationStoreServiceMock = {
      selectIsAuthenticated$: () => of(true)
    };
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsAuthenticatedDirective, HostComponent],
      providers: [{
        provide: ApplicationStoreService, useValue: applicationStoreServiceMock
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    element =  fixture.nativeElement;
  });
  it('should create an instance', () => {
    expect(element).toBeTruthy();
  });
});
