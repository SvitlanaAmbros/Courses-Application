import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from '@login/components/login/login.component';
import { LoginRoutingModule } from '@login/login-routing.module';
import { AuthService } from '@login/services/auth.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
