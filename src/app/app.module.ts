import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './http/token.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { AuthModule } from './auth/auth-module';
import { AuthService } from './shared/service/auth-service.service';
import { AuthGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './auth/login/login-form.component';
import { HomeComponent } from './home/homepage/home.component'
import { EncryptFormComponent } from './home/encrypt-form/encrypt-form.component';
import { SecretsGridComponent } from './home/secrets-grid/secrets-grid.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { MessageComponent } from './ui/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    EncryptFormComponent,
    SecretsGridComponent,
    HeaderComponent,
    FooterComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [
    AuthService,
    CookieService,
    AuthGuard,
		{
			provide: HttpClientModule
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
