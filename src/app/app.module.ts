import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';

import {SharedModule} from '@shared/shared.module';
import {AuthService} from '@core/services/auth.service';
import {CoreModule} from '@core/core.module';
import {RequestHttpInterceptor} from '@core/interceptors/http-interceptor';
import {UserEffects} from '@store/effects/user.effects';
import {CoursesEffects} from '@store/effects/courses.effects';
import {AppReducers} from '@store/reducers/app.reducers';
import {CoursesModule} from '@courses/courses.module';
import {LoginModule} from '@login/login.module';

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
    EffectsModule.forRoot([UserEffects, CoursesEffects]),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
