import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllCourseDetailComponent } from './view-all-course-detail.component';

describe('ViewAllCourseDetailComponent', () => {
  let component: ViewAllCourseDetailComponent;
  let fixture: ComponentFixture<ViewAllCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllCourseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
