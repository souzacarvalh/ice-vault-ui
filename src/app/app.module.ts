import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ChangeDetectorRef } from '@angular/core';
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
import { EncryptFormComponent } from './home/secret/encrypt-form/encrypt-form.component';
import { SecretsGridComponent } from './home/secret/secrets-grid/secrets-grid.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { MessageComponent } from './ui/message/message.component';
import { SecretViewDialogComponent } from './home/secret/secret-view-dialog/secret-view-dialog.component'; 
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from  'ngx-ui-loader';
import { MatCardModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, MatToolbarModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatPaginatorModule,
    MatSortModule, MatTableModule,  MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#FE4949',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 60,
  fgsType: SPINNER.threeStrings,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 10,
  pbColor: '#FE4949'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    EncryptFormComponent,
    SecretsGridComponent,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    SecretViewDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    NgxUiLoaderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    AuthService,
    CookieService,
    AuthGuard,
		{
			provide: HttpClientModule
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
  ],
  bootstrap: [AppComponent],
  entryComponents: [SecretViewDialogComponent]
})
export class AppModule { }
