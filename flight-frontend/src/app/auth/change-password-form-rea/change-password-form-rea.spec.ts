import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordFormRea } from './change-password-form-rea';

describe('ChangePasswordFormRea', () => {
  let component: ChangePasswordFormRea;
  let fixture: ComponentFixture<ChangePasswordFormRea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordFormRea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordFormRea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
