import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthModel } from '../model/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {

    constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {

    }

    login(formData) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic aWNlZmlyZTppY2VmaXJl'
            })
        };

        let body = "grant_type=password&client_id=icefire";

        // Receives the IceVault JWT token    
        return this.http.post(environment.authEndpoint + '/oauth/token', body + '&username=' + formData.username
            + '&password=' + formData.password, httpOptions).pipe(res => res);
    }

    logOut() {
        this.cookieService.delete('icevault-auth');
        this.cookieService.delete('icevault-token');
        this.router.navigate(['']);
    }

    isAuthenticated() {
        return this.cookieService.check('icevault-token');
    }

    getAuthenticatedUser() {

        let authModel: AuthModel = new AuthModel();

        if (this.cookieService.check('icevault-auth')) {
            authModel = JSON.parse(this.cookieService.get('icevault-auth'));
        }

        return authModel;
    }
}