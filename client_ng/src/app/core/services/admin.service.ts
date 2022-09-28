import { Injectable } from "@angular/core";
import { User } from "../../common/Interfaces/user.interface";
import { ApiService } from "./api.service";

@Injectable()
export class AdminService {
    constructor(private apiService: ApiService) {}

    getUsers() {
        localStorage.setItem("user", "1")
        return this.apiService.get<User[]>('admin/users')
    }

    deleteUser(userId: number) {
        return this.apiService.delete(`admin/del-user/${userId}`)
    }
}