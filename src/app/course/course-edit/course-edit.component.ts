import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { map } from "rxjs/operators";

import { CourseService } from "../core/course.service";
import { CourseModel } from "../core/course.model";
import { AlertService } from "src/app/shared/alert.service";
import { Teacher, Student } from "src/app/home/core/card-item.model";
import { TeacherService } from "src/app/teacher/core/teacher.service";
import { StudentService } from "src/app/student/core/student.service";

@Component({
  selector: "cm-course-edit",
  templateUrl: "./course-edit.component.html",
  styleUrls: ["./course-edit.component.css"],
})
export class CourseEditComponent implements OnInit {
  course: CourseModel;
  courseForm: FormGroup;
  teachers: Teacher[];
  students: Student[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alert: AlertService,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadCourse();
    this.loadStudents();
    this.loadTeachers();
  }

  get nameField(): AbstractControl {
    return this.courseForm.controls.name;
  }

  goBack() {
    history.back();
  }

  save() {
    this.courseService.updateCourse(this.course.id, this.courseForm.value).subscribe(
      () => {},
      () => {}    )
  }

  private loadStudents() {
    this.studentService
      .getAll()
      .pipe(
        map((response) => {
          return response.map((item) => {
            return {
              id: item.id,
              name: `${item.firstName} ${item.lastName}`,
            };
          });
        })
      )
      .subscribe((response) => {
        this.students = response;
      });
  }

  private loadTeachers() {
    this.teacherService.getAll().pipe(
      map((response) =>
        response.map((item) => ({
          id: item.id,
          name: `${item.firstName} ${item.lastName}`,
        }))
      )
    ).subscribe(response => {
      this.teachers = response;
    })
  }

  private loadCourse() {
    const { id } = this.activatedRoute.snapshot.params;

    this.courseService.getById(id).subscribe(
      (response) => {
        this.course = response;
        this.createForm();
      },
      (error) => {
        this.alert.error("Unexpected error", "Unable to load course");
      }
    );
  }

  private createForm() {
    this.courseForm = new FormGroup({
      name: new FormControl(this.course.name, Validators.required),
      description: new FormControl(this.course.description),
      city: new FormControl(this.course.city, Validators.required),
      startDate: new FormControl(this.course.startDate, Validators.required),
      endDate: new FormControl(this.course.endDate, Validators.required),
      teacher: new FormControl(this.course.teacher),
      students: new FormControl(this.course.students),
    });
  }
}
