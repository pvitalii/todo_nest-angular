import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';


@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
  declarations: [AuthComponent],
  providers: [AuthService],

})
export class AuthModule {
}
