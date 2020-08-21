import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeshoepriceComponent } from './changeshoeprice.component';

describe('ChangeshoepriceComponent', () => {
  let component: ChangeshoepriceComponent;
  let fixture: ComponentFixture<ChangeshoepriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeshoepriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeshoepriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
