import { Component, OnInit } from '@angular/core';
import { FeedbackEmailDTO } from '../../model/feedback-email.dto';
import { FeedbackService } from '../../services/feedback.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedback: FeedbackEmailDTO = {
    message: ""
  };
  formFeedback: FormGroup;

  constructor(public feedbackService: FeedbackService, 
              public formBuilder: FormBuilder,
              public route: ActivatedRoute,
              public router: Router) {
  }

  ngOnInit() {
    this.loadFormFeedback();    
  }

  private loadFormFeedback(){
    this.formFeedback = this.formBuilder.group({
        message: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });
  }

  submit(event) {        
    event.preventDefault();
    this.feedbackService.sendEmail(this.feedback)
    .subscribe(res => {
      alert("Feedback enviado com sucesso! O QParceria agradece a contribuição.");
      this.router.navigate(['/']);
    }, error => {
      if(error.status === 403){
        this.router.navigate(['/login']);
      } else {
        alert("Erro ao enviar o Feedback. Tente novamente, por favor!");
      }
    })
  }

}
