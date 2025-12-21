import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAirlineComponent } from './add-airline';

describe('AddAirline', () => {
  let component: AddAirlineComponent;
  let fixture: ComponentFixture<AddAirlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAirlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAirlineComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
