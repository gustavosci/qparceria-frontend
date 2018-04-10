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
                   toPromise()
                   .then(res => res)
                   .catch(res => res.json())
        } else {
            return this.ajax.post(this.url, userJson, header).
                   toPromise()
                   .then(res => res)
                   .catch(res => res.json())
        } 
    }

  findById(id: String){
    return this.ajax.get(this.url + "/" + id).map(res => res.json());
  }

}
