import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list.component';
import { CourseModalComponent } from './shared/course-modal/course-modal.component';
import { SharedModule } from '../shared/shared.module';
import { CourseEditComponent } from './course-edit/course-edit.component';


@NgModule({
  declarations: [
    CourseListComponent,
    CourseModalComponent,
    CourseEditComponent
  ],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    NgSelectModule,
    CourseRoutingModule,
    SharedModule
  ]
})
export class CourseModule { }
