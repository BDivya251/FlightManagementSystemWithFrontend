import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordLogin } from './discord-login';

describe('DiscordLogin', () => {
  let component: DiscordLogin;
  let fixture: ComponentFixture<DiscordLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscordLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscordLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
