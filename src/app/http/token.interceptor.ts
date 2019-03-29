import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/service/auth-service.service';
import { AuthModel } from '../shared/model/auth.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authServiceService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add th IceVault authorization header with jwt token if available
        let currentUser:AuthModel = this.authServiceService.getAuthenticatedUser();
        
        if (currentUser && currentUser.accessToken) {            
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.accessToken}`
                }
            });
        }

        return next.handle(request);
    }
}