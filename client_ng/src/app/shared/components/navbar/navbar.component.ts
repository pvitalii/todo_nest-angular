import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router) { }

  logout() {
    AuthInterceptor.accessToken = '';
    this.router.navigate(['auth/login']);
  }
}