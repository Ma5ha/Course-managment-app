import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Student, Teacher } from 'src/app/home/core/card-item.model';

export class CourseModel {
  id: number;
  name: string;
  description: string;
  city: string;
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  students?: Student[];
  teacher?: Teacher;
}
