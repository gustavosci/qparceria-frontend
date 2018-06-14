import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeedbackEmailDTO } from '../model/feedback-email.dto';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class FeedbackService {

  constructor(public http: HttpClient) {}

  public sendEmail(feedback: FeedbackEmailDTO){
    return this.http.post(
      `${API_CONFIG.urlBase}/feedback/sendemail`, 
      feedback, 
      {
        observe: 'response',
        responseType: 'text'
      });
  }

}
