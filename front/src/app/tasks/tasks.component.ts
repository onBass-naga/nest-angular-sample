import { Component, OnInit } from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TasksService } from './tasks.service';
import { Task } from './task';
import { FlatpickrOptions } from 'ng2-flatpickr';
import Japanese from 'flatpickr/dist/l10n/ja.js';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TasksService]
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  deadline: Date;
  isBrowser: Boolean = false;

  options: FlatpickrOptions = {
    locale: Japanese,
    enableTime: true,
    time_24hr: true,
    onClose: this.onClose.bind(this),
  };

  constructor(
    private readonly tasksService: TasksService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
      this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.getTasks();
  }

  onClose(value: Date): void {
    this.deadline = value[0];
  }

  getTasks(): void {
    this.tasksService.findTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  add(overview): void {
    this.tasksService.addTask({
      overview,
      deadline: this.deadline,
      priority: this.tasks.length
    } as Task).subscribe(task => {
      const index = this.tasks.findIndex(t => {
        return new Date(t.deadline).getTime() > new Date(task.deadline).getTime();
      });
      this.tasks.splice(index, 0, task);
    });
  }

  delete(id: string): void {
    this.tasksService.deleteTask(id).subscribe(() => this.getTasks());
  }
}
