import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../Interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {
  }

  registration(credentials: User) {
    return this.apiService.post('auth/registration', credentials)
  }

  login(credentials: User) {
    return this.apiService.post('auth/login', credentials)
  }
}
