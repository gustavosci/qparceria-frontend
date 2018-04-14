import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { LocalUser } from "../model/local-user";
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser: LocalUser = this.storage.getLocalUser();
        let n: number = API_CONFIG.urlBase.length;
        let requestToApiSTS: boolean = req.url.substring(0, n) === API_CONFIG.urlBase;
        
        if(localUser && requestToApiSTS){
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }
        return next.handle(req)
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}
