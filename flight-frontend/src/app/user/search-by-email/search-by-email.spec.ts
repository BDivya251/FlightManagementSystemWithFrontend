import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByEmail } from './search-by-email';

describe('SearchByEmail', () => {
  let component: SearchByEmail;
  let fixture: ComponentFixture<SearchByEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByEmail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
