import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../course/core/course.service';
import { AlertService } from 'src/app/shared/alert.service';
import { CourseModel } from '../../course/core/course.model';

@Component({
  selector: 'cm-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.css']
})
export class HomeDetailsComponent implements OnInit {

  course: CourseModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getCourse();
  }

  get endDateFormatted(): string {
    if (!this.course?.endDate) return '';

    const { day, month, year } = this.course.endDate;

    return `${day}/${month}/${year}`;
  }

  get startDateFormatted(): string {
    if (!this.course?.startDate) return '';

    const { day, month, year } = this.course.startDate;

    return `${day}/${month}/${year}`;
  }

  goBack() {
    history.back();
  }
  
  private getCourse() {
    const { id } = this.activatedRoute.snapshot.params;
    this.courseService.getById(id).subscribe(
      (result) => {
        this.course = result;
      },
      error => {
        this.alert.error("Please try later", "Unable to get details");
      }
    )
  }


}
