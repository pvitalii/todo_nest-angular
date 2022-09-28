import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CreateTaskDTO } from "../../common/dto/create-task.dto";
import { Task } from "../../common/Interfaces/task.interface";
import { ApiService } from "./api.service";

@Injectable()
export class TaskService {
    constructor(private apiService: ApiService) {}

    private _tasks = new BehaviorSubject<Task[]>([])

    tasks() {
        return 
    }

    createTask(dto: CreateTaskDTO) {
        return this.apiService.post('task/create', dto)
    }

    deleteTask(taskId: number) {
        return this.apiService.delete(`task/delete/${taskId}`)
    }

    getTasks(authorId: number) {
        return this.apiService.get<Task[]>(`task/${authorId}`)
    }
}