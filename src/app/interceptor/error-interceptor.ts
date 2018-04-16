import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) => {
            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            // Se a resposta não é um conteúdo JSON, o transforma em JSON
            if(!errorObj.status) {
                errorObj = JSON.parse(errorObj)
            }

            console.log("Erro detectado pelo interceptor: ", errorObj);
            switch(errorObj.status) {
                case 401:
                    this.handleError401();
                    break;
                case 403:
                    this.handleError403();
                    break;
                default:
                    this.handleErrorDefault(errorObj);
                    break;                    
            };

            return Observable.throw(errorObj);
        }) as any;
    }

    private handleError401(){
        alert("Usuário ou senha incorretos!");
    }

    private handleError403(){
        this.storage.setLocalUser(null);
    }

    private handleErrorDefault(error){
        alert("Erro " + error.status + ": " + error.error + "\n\n" + error.message);
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}
