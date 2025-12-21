import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByPNR } from './search-by-pnr';

describe('SearchByPNR', () => {
  let component: SearchByPNR;
  let fixture: ComponentFixture<SearchByPNR>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByPNR]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByPNR);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
