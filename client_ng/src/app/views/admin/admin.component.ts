import { ReturnStatement } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/common/Interfaces/user.interface";
import { AdminService } from "src/app/core/services/admin.service";

@Component({
    selector: 'app-admin',
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
    users: User[]

    constructor(private adminService: AdminService) {}

    getUsers() {
        return this.adminService.getUsers().subscribe((usersArray) => this.users = usersArray)
    }

    deleteUser(userId: number) {
        return this.adminService.deleteUser(userId).subscribe(() => this.getUsers())
    }

    ngOnInit(): void {
        this.getUsers()
    }
}