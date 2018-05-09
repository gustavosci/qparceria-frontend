import { Injectable } from '@angular/core';
import { ActivityDTO } from '../../model/activity.dto';
import { API_CONFIG } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../storage.service';

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
    console.log(JSON.stringify(act));
    return this.http.post(
        API_CONFIG.urlActivity,
        act,
        {
            observe: 'response',
            responseType: 'text'
        }
    );
  }

  private update(act: ActivityDTO){
    return this.http.put(
        `${API_CONFIG.urlActivity}/${act.id}`,
        act,
        {
            observe: 'response',
            responseType: 'text'
        }
    );    
  }
}
