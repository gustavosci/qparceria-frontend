import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UserComponent } from '../domain/user/user.component';

@Injectable()
export class UserService {

  ajax: Http;
  headers: Headers;
  url: string = 'http://localhost:8080/users';

  constructor(ajax: Http) {
    this.ajax = ajax;
    this.headers = new Headers();
    this.headers.append('Content-type', 'application/json');        
  }

  save(user: UserComponent){    
        let userJson: string =  JSON.stringify(user);
        let header: Object = { headers: this.headers};

        console.log(userJson);
        if(user.id){
            return this.ajax.put(this.url + "/" + user.id, userJson, header).
                   map(res => new ResponseService(res.status, "Usuário alterado com sucesso!"));
        } else {
            return this.ajax.post(this.url, userJson, header).
                  map(res => new ResponseService(res.status, "Usuário incluído com sucesso!"));
        } 
    }

  findById(id: String){
    return this.ajax.get(this.url + "/" + id).map(res => res.json());
  }
}

export class ResponseService{

  private _status: number;
  private _msg: string;

  constructor(_status: number, _msg: string){
      this._status = _status;
      this._msg = _msg;
  }
  get msg() : string{
      return this._msg;
  }

  get status() : number{
      return this._status;
  }

}