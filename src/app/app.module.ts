import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';

import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';

import {AuthService} from '@core/services/auth.service';
import {CoreModule} from '@core/core.module';
import {RequestHttpInterceptor} from '@core/interceptors/http-interceptor';
import {SharedModule} from '@shared/shared.module';
import {LoginModule} from '@login/login.module';
import {CoursesModule} from '@courses/courses.module';
import {reducer} from '@store/reducers/user.reducer';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from '@store/effects/user.effects';
import {CoursesEffects} from '@store/effects/courses.effects';
import {AppReducers} from '@store/reducers/app.reducers';

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
    StoreModule.forRoot(AppReducers),
    EffectsModule.forRoot([UserEffects, CoursesEffects])
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
export class AppModule {
}
