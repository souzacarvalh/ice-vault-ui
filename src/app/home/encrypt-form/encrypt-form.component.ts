import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from '../../crypto/crypto.service';
import { SecretService } from '../../secret/secret.service'
import { SecretModel } from 'src/app/secret/model/secret.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SecretsGridComponent } from '../secrets-grid/secrets-grid.component';

@Component({
  selector: 'app-encrypt-form',
  templateUrl: './encrypt-form.component.html',
  styleUrls: ['./encrypt-form.component.css']
})
export class EncryptFormComponent implements OnInit {

  cryptoForm: FormGroup;
  output: any;
  submitted = false;

  constructor(private ngxService: NgxUiLoaderService, private cookieService: CookieService
    , private cryptoService: CryptoService, private secretService: SecretService, private secretsGrid: SecretsGridComponent) {
  }

  ngOnInit() {
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
            this.handleSuccess(msg);
            this.secretsGrid.refresh();
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
}