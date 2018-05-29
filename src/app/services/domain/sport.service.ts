import { Injectable } from '@angular/core';
import { SportDTO } from '../../model/sport.dto';
import { API_CONFIG } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SportService {

  constructor(public http: HttpClient) {
  }

  getSports() : Observable<SportDTO[]>{    
    return this.http.get<SportDTO[]>(`${API_CONFIG.urlBase}/sports/all`);       
  }

}