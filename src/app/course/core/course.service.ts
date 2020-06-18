import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CourseModel } from './course.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<any> {
    return this.http.get(`${environment.API_URL}courses`);
  }

  createCourse(course: CourseModel): Observable<any> {
    return this.http.post(`${environment.API_URL}courses`, course);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${environment.API_URL}courses/${id}`);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}courses/${id}`);
  }

  updateCourse(id: number, data: CourseModel): Observable<any> {
    return this.http.put(`${environment.API_URL}courses/${id}`, data);
  }

}
