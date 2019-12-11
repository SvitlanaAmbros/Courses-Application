import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

import { AuthService } from '@core/services/auth.service';
import { CoreModule } from '@core/core.module';
import { RequestHttpInterceptor } from '@core/interceptors/http-interceptor';
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
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: RequestHttpInterceptor, 
      multi: true 
    } 
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
