import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  userCoursesUpdated = new Subject<{ courses: Course[], courseCount: number }>();
  buyerCoursesUpdated = new Subject<{ buyerCourses: Course[], buyerCourseCount: number }>();
  allUserCoursesUpdated = new Subject<{ allCourses: Course[], allCourseCount: number }>();

  newCourseAdded = new Subject<{ course: Course }>();
  newCourseSubscribed = new Subject<{ buyerCourse: Course }>();

  private courses: Course[] = [];
  private totalCourses: number;

  private buyerCourses: Course[] = [];
  private buyerTotalCourses: number;

  private allCourses: Course[] = [];
  private allTotalCourses: number;

  constructor(private http: HttpClient, private router: Router) { }

  // Observables-

  senduserCourses() {
    return this.userCoursesUpdated.asObservable();
  }

  sendbuyerCourses() {
    return this.buyerCoursesUpdated.asObservable();
  }

  sendallUserCourses() {
    return this.allUserCoursesUpdated.asObservable();
  }

  // Instructor-

  getUserCourses(coursesPerPage?: number, currentPage?: number, selected?: string, selectedOption?: string) {
    const queryParams = `?limit=${coursesPerPage}&skip=${currentPage}&sortBy=${selected}:${selectedOption}`;
    this.http.get<{ owner: string, tasks: Course[], coursesCount: number }>(BACKEND_URL + "user-tasks" + queryParams).pipe(map(courseData => {
      return {
        owner: courseData.owner,
        tasks: courseData.tasks.map(task => {
          var _id = task._id;
          var title = task.title;
          var instructions = task.instructions;
          var avatar = task.avatar;
          var owner = courseData.owner;
          var createdAt = task.createdAt;
          var updatedAt = task.updatedAt;
          var subscribers = task.buyers.length;
          
          
          let taskInfo = {
            _id: _id,
            title: title,
            instructions: instructions,
            avatar: avatar,
            owner: owner,
            createdAt: createdAt,
            updatedAt: updatedAt,
            buyers: subscribers
          }
          
          return taskInfo;
        }),
        maxCourses: courseData.coursesCount
      };
    })).subscribe(response => {
      //console.log(response);
      this.courses = response.tasks;
      this.totalCourses = response.maxCourses;
      this.userCoursesUpdated.next({ courses: [...this.courses], courseCount: response.maxCourses });
    }, error => {
        this.router.navigate(['courses','courses']);
    });

    return { courses: [...this.courses], maxCourses: this.totalCourses };
  }

  getUserCourse(id: string) {
    return this.http.get<{ task: Course, owner: string }>(BACKEND_URL + "tasks/" + id).pipe(map(courseData => {
      return {
        owner: courseData.owner,
        task: {
          _id: courseData.task._id,
          title: courseData.task.title,
          instructions: courseData.task.instructions,
          owner: courseData.owner,
          avatar: courseData.task.avatar,
          createdAt: courseData.task.createdAt,
          updatedAt: courseData.task.updatedAt,
          subscribers: courseData.task.buyers.length
        }
      };
    }
    ));
  }

  updateCourse(id: string, instructions: string, image?: File | any) {

    let courseData: any | FormData;
    if (typeof image === "object") {
      courseData = new FormData();
      courseData.append("instructions", instructions);
      courseData.append("avatar", image);
    } else {
      courseData = {
        instructions: instructions,
        avatar: image
      };
    }

    //var courseData = new FormData();
    //courseData.append("instructions", instructions);
    //courseData.append("avatar", image);

    //console.log(courseData);
    this.http.put<{ message: string, course: Course, Id: string }>(BACKEND_URL + "tasks/" + id, courseData).subscribe((response) => {
      this.userCoursesUpdated.next({ courses: [...this.courses], courseCount: this.totalCourses });
      //console.log(response.message);
      this.router.navigate(["courses", "view", id]);
    });
  }

  addCourse(title: string, instructions: string, image: File) {
    const courseData = new FormData();
    courseData.append("title", title);
    courseData.append("instructions", instructions);
    courseData.append("avatar", image);

    //console.log(courseData);
    this.http.post<{ message: string, course: Course }>(BACKEND_URL + "tasks", courseData).subscribe(responseData => {
      this.userCoursesUpdated.next({ courses: [...this.courses], courseCount: this.totalCourses });
      this.router.navigate(["courses", "courses"]);
    }, error => {
        window.location.reload();
    });
  }

  // Student:-

  onSubscribeTask(id: string, buyer: string) {
    this.http.patch<{ course: any, user: any, msg: string }>(BACKEND_URL + "tasks/buy/" + id, buyer).subscribe((response) => {
      this.buyerCoursesUpdated.next({ buyerCourses: [...this.buyerCourses], buyerCourseCount: this.buyerTotalCourses });
      window.alert("Successfully Subscribed!!!");
    }, error => {
        window.location.reload();
    });
  }

  getBuyerCourses(coursesPerPage: number, currentPage: number) {
    const queryParams = `?limit=${coursesPerPage}&skip=${currentPage}`;
    this.http.get<{ buyerTotalCourses: number, buyerTasks: any }>(BACKEND_URL + "mytasks" + queryParams).pipe(map(courseData => {
      return {
        tasks: courseData.buyerTasks.map(task => {
          var _id = task._id;
          var title = task.title;
          var instructions = task.instructions;
          var avatar = task.avatar;
          var owner = task.owner;
          var createdAt = task.createdAt;
          var updatedAt = task.updatedAt;
          var subscribers = task.buyers.length;

          let taskInfo = {
            _id: _id,
            title: title,
            instructions: instructions,
            avatar: avatar,
            owner: owner,
            createdAt: createdAt,
            updatedAt: updatedAt,
            buyers: subscribers
          }

          return taskInfo;
        }),
        maxCourses: courseData.buyerTotalCourses
      };
    })).subscribe(response => {
      //console.log(response);
      this.buyerCourses = response.tasks;
      this.buyerTotalCourses = response.maxCourses;
      this.buyerCoursesUpdated.next({ buyerCourses: [...this.buyerCourses], buyerCourseCount: response.maxCourses });
    }, error => {
        this.router.navigate(['courses', 'courses']);
    });

    return { buyerCourses: [...this.buyerCourses], buyerCourseCount: this.buyerTotalCourses };
  }

  getBuyerCourse(id: string) {
    return this.http.get<{ task: Course, owner: string }>(BACKEND_URL + "mytasks/get/" + id).pipe(map(courseData => {
      return {
        owner: courseData.owner,
        task: {
          _id: courseData.task._id,
          title: courseData.task.title,
          instructions: courseData.task.instructions,
          owner: courseData.owner,
          avatar: courseData.task.avatar,
          createdAt: courseData.task.createdAt,
          updatedAt: courseData.task.updatedAt,
          buyers: courseData.task.buyers.length
        }
      };
    }
    ));
  }

  // General Users-

  getAllCourse(id: string) {
    return this.http.get<{ task: Course, owner: string }>(BACKEND_URL + "alltasks/get/" + id).pipe(map(courseData => {
      return {
        owner: courseData.owner,
        task: {
          _id: courseData.task._id,
          title: courseData.task.title,
          instructions: courseData.task.instructions,
          owner: courseData.owner,
          avatar: courseData.task.avatar,
          createdAt: courseData.task.createdAt,
          updatedAt: courseData.task.updatedAt,
          buyers: courseData.task.buyers.length
        }
      };
    }
    ));
  }

  getAllCourses(coursesPerPage: number, currentPage: number, selected?: string, selectedOption?: string) {
    const queryParams = `?limit=${coursesPerPage}&skip=${currentPage}&sortBy=${selected}:${selectedOption}`;
    this.http.get<{ tasks: Course[], coursesCount: number }>(BACKEND_URL + "alltasks" + queryParams).pipe(map(courseData => {
      return {
        tasks: courseData.tasks.map(task => {
          var _id = task._id;
          var title = task.title;
          var instructions = task.instructions;
          var avatar = task.avatar;
          var owner = task.owner;
          var createdAt = task.createdAt;
          var updatedAt = task.updatedAt;
          var subscribers = task.buyers.length;

          let taskInfo = {
            _id: _id,
            title: title,
            instructions: instructions,
            avatar: avatar,
            owner: owner,
            createdAt: createdAt,
            updatedAt: updatedAt,
            buyers: subscribers
          }

          return taskInfo;
        }),
        maxCourses: courseData.coursesCount
      };
    })).subscribe(response => {
      //console.log(response);
      this.allCourses = response.tasks;
      this.allTotalCourses = response.maxCourses;
      this.allUserCoursesUpdated.next({ allCourses: [...this.allCourses], allCourseCount: response.maxCourses });
    }, error => {
        this.router.navigate(['main','products']);
    });

    return { allCourses: [...this.allCourses], maxCourses: this.allTotalCourses };
  }

}
