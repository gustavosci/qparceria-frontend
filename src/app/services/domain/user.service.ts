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
        if(user.id){
            return this.update(user);
        } else {
            return this.insert(user);
        } 
    }

    private insert(user: UserDTO){
        return this.http.post(
            `${API_CONFIG.urlBase}/users`,
            user,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    private update(user: UserDTO){
        return this.http.put(
            `${API_CONFIG.urlBase}/users/${user.id}`,
            user,
            {
                observe: 'response',
                responseType: 'text'
            }
        );    
    }

  findByUsername(username: String) : Observable<UserDTO>{    
    return this.http.get<UserDTO>(`${API_CONFIG.urlBase}/users/username?value=${username}`);       
  }
    
}