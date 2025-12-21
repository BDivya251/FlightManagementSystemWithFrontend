import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllAirline } from './get-all-airline';

describe('GetAllAirline', () => {
  let component: GetAllAirline;
  let fixture: ComponentFixture<GetAllAirline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllAirline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllAirline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
