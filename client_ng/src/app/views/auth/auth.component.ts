import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../../common/Interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Token } from 'src/app/common/Interfaces/token';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router
  ) {}

//   authType: string = ''
//   authForm = {
//     title: '',
//     button: '',
//     span: '',
//     link: '',
//   }
//   credentials: User = {
//     name: '',
//     password: '',
// }

//   registration() {
//     this.authService.registration(this.credentials).subscribe(
//       (res: any) => {
//         AuthInterceptor.accessToken = res.accessToken;
//         this.router.navigate(['/']);
//       }
//       )
//   }
  
//   login() {
//     this.authService.login(this.credentials).subscribe(
//       (res: any) => {
//         AuthInterceptor.accessToken = res.accessToken;
//         this.router.navigate(['/']);
//       })
//   }


//   submitForm(path: string) {
//     if(path === 'registration') {
//       this.registration()
//     } else if(path === 'login') {
//       this.login()
//     }
//   }

//   ngOnInit(): void {
//     this.authType = this.location.path().slice(6)
//     this.authForm = (this.authType === 'login') ?
//       {
//         title: 'Login',
//         button: 'Log in',
//         span: 'Don\'t have an account?',
//         link: 'Sign up'
//       }
//       :
//       {
//         title: 'Registration',
//         button: 'Sign up',
//         span: 'Do you already have an account?',
//         link: 'Log in'
//       }
//   }
ngOnInit(): void {
  
}

}
