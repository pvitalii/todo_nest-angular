import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/core/Interfaces/task.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router,
    ) {}


    userTasks: Task[] = []

    taskContent = {
      title: '',
      content: '',
      date: ''
    }

    createTask(taskContent: any) {
      this.apiService.get('auth/profile').subscribe((res: any) => {
        const authorId = res.id;
        this.apiService.post('task/create', {...taskContent, authorId}).subscribe(() => {
          const tasks = this.apiService.get(`task/${res.id}`);
          tasks.subscribe((data: any) => this.userTasks = data);
        })
      } )
    }

    deleteTask(taskId: number) {
      this.apiService.delete(`task/delete/${taskId}`).subscribe(() => this.apiService.get('auth/profile')
      .subscribe((res:any) => {
        const tasks = this.apiService.get(`task/${res.id}`)
        tasks.subscribe((data: any) => this.userTasks = data);
      }));
      
    }

  ngOnInit(): void {
    this.apiService.get('auth/profile')
    .subscribe({
      next: (res: any) => {
        const tasks = this.apiService.get(`task/${res.id}`)
        tasks.subscribe((data: any) => this.userTasks = data);
      },
      error: () => {
        this.router.navigate(['auth/login']);
      }
    });
  }

}
