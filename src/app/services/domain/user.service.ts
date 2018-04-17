import { Injectable } from '@angular/core';
import { UserDTO } from '../../model/user.dto';
import { API_CONFIG } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../storage.service';

@Injectable()
export class UserService {

  constructor(public http: HttpClient, public storage: StorageService) {
  }

  save(user: UserDTO){    
        console.log(user);        
        if(user.id){
            return this.update(user);
        } else {
            return this.insert(user);
        } 
    }

    private insert(user: UserDTO){
        return this.http.post(
            API_CONFIG.urlUser,
            user,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    private update(user: UserDTO){
        return this.http.put(
            `${API_CONFIG.urlUser}/${user.id}`,
            user,
            {
                observe: 'response',
                responseType: 'text'
            }
        );    
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