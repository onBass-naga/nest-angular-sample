import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from './task';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class TasksService {
  url = `${environment.apiBaseUrl}/tasks`;
  constructor(private readonly http: HttpClient) { }

  findTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task, httpOptions);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, httpOptions);
  }
}
