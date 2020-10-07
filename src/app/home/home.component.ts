import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course/core/course.service';
import { CourseModel } from '../course/core/course.model';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'cm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  courses: CourseModel[];

  constructor(
    private courseService: CourseService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  private getCourses() {
    this.courseService.getAll().subscribe(
      (result) => {
        this.courses = result;
      },
      (error) => {
        this.alert.error("Please try later", "Unable to get details");
      }
    );
  }

}
