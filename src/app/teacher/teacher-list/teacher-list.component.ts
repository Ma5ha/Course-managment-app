import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { TeacherModel } from "../core/teacher.model";
import { TeacherService } from "../core/teacher.service";
import { TeacherModalComponent } from "../shared/teacher-modal/teacher-modal.component";
import { AlertService } from 'src/app/shared/alert.service';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';

@Component({
  selector: "cm-teacher-list",
  templateUrl: "./teacher-list.component.html",
  styleUrls: ["./teacher-list.component.css"],
})
export class TeacherListComponent implements OnInit {
  teachers: TeacherModel[];

  constructor(
    private teacherService: TeacherService,
    private modalService: NgbModal,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  addTeacher() {
    const modalRef = this.modalService.open(TeacherModalComponent);
    modalRef.componentInstance.title = "Add Teacher";

    modalRef.result.then((result) => {
      if (!result) return;

      this.teacherService.createTeacher(result).subscribe(
        (success) => {
          this.loadTeachers();
        },
        (error) => {
          this.alert.error("Please try later", "Unable to create teacher");
        }
      );
    });
  }

  editTeacher(teacher: TeacherModel) {
    const modalRef = this.modalService.open(TeacherModalComponent);
    modalRef.componentInstance.title = "Edit Teacher";
    modalRef.componentInstance.teacher = teacher;
    modalRef.componentInstance.btnLabel = "Edit";

    modalRef.result.then((result) => {
      if (!result) return;

      this.teacherService.updateTeacher(teacher.id, result).subscribe(
        (success) => {
          this.loadTeachers();
        },
        (error) => {
          this.alert.error("Please try later", "Unable to edit teacher");
        }
      );
    });
  }

  deleteTeacher(teacher: TeacherModel) {
      const modalRef = this.modalService.open(ConfirmModalComponent);
      modalRef.componentInstance.title = `Delete ${teacher.firstName} ${teacher.lastName}`;
  
      modalRef.result.then((result) => {
        if (!result) return;
  
        this.teacherService.deleteTeacher(teacher.id).subscribe(
          (success) => {
            this.alert.info("Teacher deleted");
            this.loadTeachers();
          },
          (error) => {
            this.alert.error("Please try later", "Unexpected error");
          }
        );
      });
  }

  private loadTeachers() {
    this.teacherService.getAll().subscribe(
      (response) => {
        this.teachers = response;
      },
      (error) => {
        this.alert.error("Please try later", "Unexpected error");
      }
    );
  }
}
