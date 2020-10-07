import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { StudentService } from '../core/student.service';
import { StudentModel } from '../core/student.model';
import { StudentModalComponent } from '../shared/student-modal/student-modal.component';
import { AlertService } from 'src/app/shared/alert.service';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'cm-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: StudentModel[];

  constructor(
    private studentService: StudentService,
    private modalService: NgbModal,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.loadStudents();
  }


  addStudent() {
    const modalRef = this.modalService.open(StudentModalComponent);
    modalRef.componentInstance.title = "Add Student";

    modalRef.result.then((result) => {
      if (!result) return;

      this.studentService.createStudent(result).subscribe(
        (success) => {
          this.loadStudents();
        },
        (error) => {
          this.alert.error('Please try later', 'Unable to create student')  
        }
      );
    });
  }

  editStudent(student: StudentModel) {
    const modalRef = this.modalService.open(StudentModalComponent);
    modalRef.componentInstance.title = "Edit Student";
    modalRef.componentInstance.student = student;
    modalRef.componentInstance.btnLabel = 'Edit';

    modalRef.result.then((result) => {
      if (!result) return;

      this.studentService.updateStudent(student.id, result).subscribe(
        (success) => {
          this.loadStudents();
        },
        (error) => {
          this.alert.error('Please try later', 'Unexpected to edit student')
        }
      );
    });
  }

  deleteStudent(student: StudentModel) {
      const modalRef = this.modalService.open(ConfirmModalComponent);
      modalRef.componentInstance.title = `Delete ${student.firstName} ${student.lastName}`;
  
      modalRef.result.then((result) => {
        if (!result) return;
  
        this.studentService.deleteStudent(student.id).subscribe(
          (success) => {
            this.alert.info("Student deleted");
            this.loadStudents();
          },
          (error) => {
            this.alert.error("Please try later", "Unexpected error");
          }
        );
      });
  }

  private loadStudents() {
    this.studentService.getAll().subscribe(
      (response) => {
        this.students = response;
      },
      (error) => {
        this.alert.error('Please try later', 'Unexpected error')
      }
    );
  }

}
