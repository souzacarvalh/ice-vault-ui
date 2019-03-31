import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecretModel } from './model/secret.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecretService {

  constructor(private http: HttpClient) {

  }

  listSecrets(userId: BigInteger): Observable<SecretModel[]> {
    return this.http.get<SecretModel[]>(environment.secretsEndpoint, {
      params: {
        userId: `${userId}`,
      }
    });
  }

  save(secret: SecretModel) {
    return this.http.post(environment.secretsEndpoint, secret);
  }
}