import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeResetPasswordComponent } from './change-reset-password.component';

describe('ChangeResetPasswordComponent', () => {
  let component: ChangeResetPasswordComponent;
  let fixture: ComponentFixture<ChangeResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
