import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthModel } from '../../shared/model/auth.model';
import { AuthService } from '../../shared/service/auth-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  error: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private cookieService: CookieService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.error = null;
      this.doLogin();
    }
  }

  doLogin() {
    this.cookieService.delete('icevault-auth');
    this.cookieService.delete('icevault-token');


    let formData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    let observableToken = this.authService.login(formData);

    observableToken.subscribe(
      res => {

        let authModel: AuthModel = new AuthModel();

        authModel.accessToken = res['access_token'];
        authModel.userId = res['user_id'];
        authModel.publicKey = res['public_key'];

        this.cookieService.set('icevault-auth', JSON.stringify(authModel));
        this.cookieService.set('icevault-token', String(authModel.accessToken));

        this.router.navigateByUrl('/home');
      },
      err => {
        this.error = err;
      }
    );
  }
}