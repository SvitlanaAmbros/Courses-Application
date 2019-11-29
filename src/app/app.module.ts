import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AuthService } from '@app/core/services/auth.service';

import { CoreModule } from '@core/core.module';
import {AuthGuard} from '@core/guards/auth.guard';
import { SharedModule } from '@shared/shared.module';
import { LoginModule } from '@login/login.module';
import { CoursesModule } from '@courses/courses.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoursesModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    LoginModule,
  ],
  providers: [
    AuthService,
    // AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
