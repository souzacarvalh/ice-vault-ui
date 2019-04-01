import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from '../../../crypto/crypto.service';
import { SecretService } from '../../../secret/secret.service'
import { SecretModel } from 'src/app/secret/model/secret.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SecretEventsService } from '../secret-events/secret-events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encrypt-form',
  templateUrl: './encrypt-form.component.html',
  styleUrls: ['./encrypt-form.component.css']
})
export class EncryptFormComponent implements OnInit {

  cryptoForm: FormGroup;
  output: any;
  submitted = false;
  secrets: SecretModel[];

  constructor(private ngxService: NgxUiLoaderService, private cookieService: CookieService, private router: Router,
    private cryptoService: CryptoService, private secretService: SecretService, private secretEventsService: SecretEventsService) {
  }

  ngOnInit() {
    this.refreshSecrets()
    this.initForm();
  }

  initForm() {
    this.cryptoForm = new FormGroup({
      secret: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.cryptoForm.valid) {

      this.ngxService.start();

      if (this.cookieService.check('icevault-auth')) {
        this.output = null;
        let encryptedSecret = this.encryptSecret();

        this.secretService.save(encryptedSecret).subscribe(
          () => {
            let msg = `Encrypted Secret => ${encryptedSecret.data}`
            this.refreshForm();
            this.refreshSecrets();
            this.handleSuccess(msg);
            this.reload();
          },
          err => {
            this.handleError(err);
          }
        );
      }
    }
  }

  encryptSecret(): SecretModel {
    let authInfo = JSON.parse(this.cookieService.get('icevault-auth'));
    let secret: SecretModel = {
      userId: authInfo.userId,
      data: this.cryptoForm.value.secret,
      passphrase: ''
    }
    return this.cryptoService.encrypt(secret, authInfo.publicKey);
  }

  refreshSecrets() {
    let authInfo = JSON.parse(this.cookieService.get('icevault-auth'));
    this.secretService.listSecrets(authInfo.userId).subscribe(secrets => { this.secrets = secrets });
    this.secretEventsService.next(this.secrets);
  }

  refreshForm() {
    this.submitted = false;
    this.cryptoForm.reset();
  }

  handleSuccess(msg) {
    this.output = msg;
    this.ngxService.stop();
  }

  handleError(err) {
    this.output = err;
    this.ngxService.stop();
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };

    let currentUrl = this.router.url + '?';

    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }
}