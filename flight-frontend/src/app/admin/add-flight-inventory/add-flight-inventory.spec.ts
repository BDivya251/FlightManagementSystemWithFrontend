import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlightInventoryComponent } from './add-flight-inventory';

describe('AddFlightInventory', () => {
  let component: AddFlightInventoryComponent;
  let fixture: ComponentFixture<AddFlightInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFlightInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFlightInventoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
