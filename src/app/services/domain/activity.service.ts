import { Injectable } from '@angular/core';
import { ActivityDTO } from '../../model/activity.dto';
import { API_CONFIG } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../storage.service';
import { ActivitySimpleConsultDTO } from '../../model/activitysimpleconsult.dto';
import { ActivityDomain } from '../../model/domain/activity.domain';
import { ActivitySearchDTO } from '../../model/activitysearch.dto';

@Injectable()
export class ActivityService {

  constructor(public http: HttpClient, public storage: StorageService) {
  }

  save(act: ActivityDTO){        
    if(act.id){
        return this.update(act);
    } else {
        return this.insert(act);
    } 
  }

  private insert(act: ActivityDTO){
    return this.http.post(
       `${API_CONFIG.urlBase}/activities`,
        act,
        {
            observe: 'response',
            responseType: 'text'
        }
    );
  }

  private update(act: ActivityDTO){
    return this.http.put(
        `${API_CONFIG.urlBase}/activities/${act.id}`,
        act,
        {
            observe: 'response',
            responseType: 'text'
        }
    );    
  }

  findById(id: String) : Observable<ActivityDTO>{    
    return this.http.get<ActivityDTO>(`${API_CONFIG.urlBase}/activities/${id}`);       
  }

  findByIdDetail(id: String) : Observable<ActivityDomain>{    
    return this.http.get<ActivityDomain>(`${API_CONFIG.urlBase}/activities/detail/${id}`);       
  }

  findAllActOfUserLogged() : Observable<ActivitySimpleConsultDTO[]>{
    return this.http.get<ActivitySimpleConsultDTO[]>(`${API_CONFIG.urlBase}/activities/my`);    
  }

  search(sportid: String, 
        citystartid: string,
        maxDistance: string,
        maxAverage: string,
        includesOwn: boolean) : Observable<ActivitySearchDTO[]>{    
      return this.http.get<ActivitySearchDTO[]>(
      `${API_CONFIG.urlBase}/activities/search?sport=${sportid}&citystart=${citystartid}&maxdistance=${maxDistance}&maxaverage=${maxAverage}&includesown=${includesOwn}`);
  }

}
