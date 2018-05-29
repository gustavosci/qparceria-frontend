import { Injectable } from '@angular/core';
import { UFDTO } from '../../model/uf.dto';
import { API_CONFIG } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CityDTO } from '../../model/city.dto';

@Injectable()
export class UFService {

  constructor(public http: HttpClient) {
  }

  getUFs() : Observable<UFDTO[]>{    
    return this.http.get<UFDTO[]>(`${API_CONFIG.urlBase}/ufs/all`);       
  }

  getCitiesByUF(ufId: string) : Observable<CityDTO[]>{    
    return this.http.get<CityDTO[]>(`${API_CONFIG.urlBase}/ufs/${ufId}/cities`);       
  }

}
