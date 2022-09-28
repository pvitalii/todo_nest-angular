import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {
  authType: string;
  _isAuth: Observable<boolean>

  constructor(private router: Router, private authService: AuthService) { }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['auth/login']));
  }
  
  ngOnInit(): void {
    this._isAuth = this.authService.isAuth()
  }
}