import { Injectable } from '@angular/core';
import { CredentialsDTO } from '../model/credentials.dto';
import { HttpClient } from '@angular/common/http';
import { LocalUser } from '../model/local-user';
import { StorageService } from './storage.service';
import { API_CONFIG } from '../config/api.config';
import { JwtHelper } from 'angular2-jwt';
import { UserService } from "../services/domain/user.service";

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: HttpClient, 
              public storage: StorageService,
              public userService: UserService) {
  }

  public authenticate(creds: CredentialsDTO){
    return this.http.post(
      `${API_CONFIG.urlAuth}`, 
      creds, 
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  public refreshToken(){
    return this.http.post(
      `${API_CONFIG.urlRefreshToken}`, 
      {}, 
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  successfulLogin(authorizationValue: string){
    let tok = authorizationValue.substring(7); // Retira Bearer do início do token
    let userSS : LocalUser = {
      token: tok,
      username: this.jwtHelper.decodeToken(tok).sub,
      id: ""
    };
    this.storage.setLocalUser(userSS); // Já será localuser neste ponto, pois é necessário para comunicação com userservice
    this.userService
      .findByUsername(userSS.username)
      .subscribe(
        user => {
            userSS.id = user.id;
            this.storage.setLocalUser(userSS);  
        },
        erro => { 
          this.logout();
          alert("Não foi possível buscar informações do usuário no servidor! Tente novamente mais tarde.");
        }
    );    
  }

  logout(){
    this.storage.setLocalUser(null);
  }
}
