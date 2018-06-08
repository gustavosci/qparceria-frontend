import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from '../../config/api.config';
import { MatchDTO } from '../../model/match.dto';

@Injectable()
export class MatchService {

  constructor(public http: HttpClient) {
  }

  insert(idAct: string){
    return this.http.post(
        `${API_CONFIG.urlBase}/matches/${idAct}`,
        {
            observe: 'response',
            responseType: 'text'
        }
    );
  }

  undo(idAct: string){
    return this.http.delete(
        `${API_CONFIG.urlBase}/matches/${idAct}`
    );
  }

  produced() : Observable<MatchDTO[]>{    
    return this.http.get<MatchDTO[]>(`${API_CONFIG.urlBase}/matches/produced`);       
  }

  received() : Observable<MatchDTO[]>{    
    return this.http.get<MatchDTO[]>(`${API_CONFIG.urlBase}/matches/received`);       
  }
}
