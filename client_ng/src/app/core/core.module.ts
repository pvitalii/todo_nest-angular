import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminService } from './services/admin.service';
import { httpInterceptorProviders } from './interceptors/http.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [ApiService, AuthService, TaskService, AuthGuard, AdminService, httpInterceptorProviders]
})
export class CoreModule {
}
