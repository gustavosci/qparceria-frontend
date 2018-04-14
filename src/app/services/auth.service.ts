import { Injectable } from '@angular/core';
import { CredentialsDTO } from '../model/credentials.dto';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  url: string = 'http://localhost:8080/login';

  constructor(public http: HttpClient) {
  }

  public authenticate(creds: CredentialsDTO){
    return this.http.post(
      this.url, 
      creds, 
      {
        observe: 'response',
        responseType: 'text'
      });
  }

}
