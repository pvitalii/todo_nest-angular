import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/common/Interfaces/task.interface';
import { TaskService } from 'src/app/core/services/task.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/common/Interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private taskService: TaskService) {}
  user: User;
  tasks: Task[];

  taskForm = {
    title: '',
    content: '',
    date: ''
  }

  createTask() {
    this.taskService.createTask({ ...this.taskForm, authorId: this.user.id }).subscribe(() => this.getTasks());
  }

  getTasks() {
    this.taskService.getTasks(this.user.id).subscribe((taskArray) => this.tasks = taskArray);
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => this.getTasks())
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.getTasks();
      },
    });
  }
}
