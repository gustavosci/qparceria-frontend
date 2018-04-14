import { Injectable } from '@angular/core';
import { UserDTO } from '../../model/user.dto';
import { API_CONFIG } from '../../config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../storage.service';

@Injectable()
export class UserService {

  constructor(public http: HttpClient, public storage: StorageService) {
  }

  save(user: UserDTO){    
  /*

        let userJson: string =  JSON.stringify(user);
        let header: Object = { headers: this.headers};

        console.log(userJson);
        if(user.id){
            return this.http.put(API_CONFIG.urlUser + "/" + user.id, userJson, header).
                   map(res => new ResponseService(res.status, "Usuário alterado com sucesso!"));
        } else {
            return this.http.post(API_CONFIG.urlUser, userJson, header).
                  map(res => new ResponseService(res.status, "Usuário incluído com sucesso!"));
        } 
*/

      }

  findByUsername(username: String) : Observable<UserDTO>{    
    return this.http.get<UserDTO>(`${API_CONFIG.urlUser}/username?value=${username}`);       
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