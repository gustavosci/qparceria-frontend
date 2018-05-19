import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { StorageService } from '../services/storage.service';
import { FieldMessage } from "../model/fieldmessage";

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
                case 422:
                    this.handleError422(errorObj);
                    break;
                case 404:
                    this.handleError404(errorObj);
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

    private handleError422(error){
        alert(this.stringfyListErrors(error.errors));
    }

    private handleError404(error){
        alert("Registro não encontrado!");
    }

    private handleErrorDefault(error){
        if(error.status){
            alert("Erro " + error.status + ": " + error.error + "\n\n" + error.message);
        }        
    }

    private stringfyListErrors(messages : FieldMessage[]) : string{
        let s : string = 'Erros de validação: \n\n';
        for(var i=0; i<messages.length; i++){
            s += messages[i].fieldName + ": " + messages[i].message;
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}
