import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthForm } from './components/authForm/authForm.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    NavbarComponent,
    AuthForm,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule, 
  ],
  exports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule, 
    AuthForm,
  ]
})
export class SharedModule { }
