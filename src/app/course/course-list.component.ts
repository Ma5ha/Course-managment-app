import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from '@angular/router';

import { CourseService } from "./core/course.service";
import { CourseModel } from "./core/course.model";
import { CourseModalComponent } from "./shared/course-modal/course-modal.component";
import { AlertService } from "../shared/alert.service";
import { ConfirmModalComponent } from "../shared/confirm-modal/confirm-modal.component";

@Component({
  selector: "cm-course",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"],
})
export class CourseListComponent implements OnInit {
  courses: CourseModel[];

  constructor(
    private courseService: CourseService,
    private modalService: NgbModal,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  addCourse() {
    const modalRef = this.modalService.open(CourseModalComponent);
    modalRef.componentInstance.title = "Add Course";

    modalRef.result.then((result) => {
      if (!result) return;

      this.courseService.createCourse(result).subscribe(
        (success) => {
          this.alert.success("Course added");
          this.loadCourses();
        },
        (error) => {
          this.alert.error("Please try later", "Unexpected error");
        }
      );
    });
  }

  editCourse(course: CourseModel) {
    this.router.navigate([ 'courses/edit', course.id ]);
  }

  deleteCourse(course: CourseModel) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = `Delete ${course.name}`;

    modalRef.result.then((result) => {
      if (!result) return;

      this.courseService.deleteCourse(course.id).subscribe(
        (success) => {
          this.alert.info("Course deleted");
          this.loadCourses();
        },
        (error) => {
          this.alert.error("Please try later", "Unexpected error");
        }
      );
    });
  }

  private loadCourses() {
    this.courseService.getAll().subscribe(
      (result) => {
        this.courses = result;
      },
      (error) => {
        this.alert.error("Please try later", "Unexpected error");
      }
    );
  }
}
