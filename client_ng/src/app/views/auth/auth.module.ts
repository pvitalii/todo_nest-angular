import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';


@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
  declarations: [AuthComponent],
  providers: [],

})
export class AuthModule {
}
