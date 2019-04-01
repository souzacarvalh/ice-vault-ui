import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SecretModel } from 'src/app/secret/model/secret.model';
import { SecretService } from 'src/app/secret/secret.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SecretEventsService {

  source = new Subject<SecretModel[]>();
  data$ = this.source.asObservable();

  constructor(private secretService: SecretService, private cookieService: CookieService) {}

  next(data: SecretModel[]) {
    this.source.next(data);
  }

  public getData(): Observable<SecretModel[]> {
    let authInfo = JSON.parse(this.cookieService.get('icevault-auth'));
    return this.secretService.listSecrets(authInfo.userId);
  }

  public setData(data: SecretModel[]) {
    this.source.next(data);
  }
}