import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../../common/Interfaces/user.interface';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {
  }

  private _isAuth = new BehaviorSubject<boolean>(!!localStorage.getItem("user"));
  private _currentUser = new BehaviorSubject<User | null>(null);

  isAuth() {
    return this._isAuth.asObservable()
  }

  setIsAuth(auth: boolean) {
    return this._isAuth.next(auth)
  }

  checkAuthStatus() {
    const authStatus = new BehaviorSubject<boolean>(false);
    this.getUser()
    return authStatus
  }


  registration(credentials: User) {
    this.setIsAuth(true)
    return this.apiService.post('auth/registration', credentials, {withCredentials: true})
  }

  login(credentials: User) {
    this.setIsAuth(true)
    return this.apiService.post('auth/login', credentials, { withCredentials: true })
  }

  logout() {
    localStorage.setItem("user", "")
    this.setIsAuth(false);
    return this.apiService.delete('auth/logout')
  }

  getUser() {
    localStorage.setItem("user", "1")
    return this.apiService.get<User>('auth/profile', {withCredentials: true})
  }
}
