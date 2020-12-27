import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfilePicComponent } from './view-profile-pic.component';

describe('ViewProfilePicComponent', () => {
  let component: ViewProfilePicComponent;
  let fixture: ComponentFixture<ViewProfilePicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProfilePicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfilePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
