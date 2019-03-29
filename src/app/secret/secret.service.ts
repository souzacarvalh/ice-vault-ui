import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecretModel } from './model/secret.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SecretService {

  constructor(private http: HttpClient) {

  }

  listSecrets() {

  }

  encryptAndSave(formData: FormGroup) {

  }

  desencryptAndShow(secretId: BigInteger) {

  }
}