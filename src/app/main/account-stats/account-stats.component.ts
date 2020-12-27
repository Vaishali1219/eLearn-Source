import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Course } from '../../courses/course.model';
import { CourseService } from '../../courses/course.service';

@Component({
  selector: 'app-account-stats',
  templateUrl: './account-stats.component.html',
  styleUrls: ['./account-stats.component.scss']
})
export class AccountStatsComponent implements OnInit, AfterViewInit, OnDestroy {
  
  displayedColumns: string[] = ['createdAt', 'updatedAt', 'title', 'buyers'];
  dataSource = new MatTableDataSource<any>();
  courseSubscription: Subscription;
  private courses: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courses = this.courseService.getUserCourses();
    //console.log(this.courses);
    this.dataSource.data = this.courses.courses;
    //console.log(this.dataSource.data);
    this.courseSubscription = this.courseService.userCoursesUpdated.subscribe((courseData: { courses: Course[], courseCount: number }) => {
      this.dataSource.data = courseData.courses;
      //console.log(this.dataSource.data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }

}
