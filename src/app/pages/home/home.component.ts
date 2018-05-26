import { Component, OnInit } from '@angular/core';
import { LocalUser } from '../../model/local-user';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { PanelActivityComponent } from '../../global/panelactivity/panelactivity.component';
import { SimpleListActComponent } from '../../global/simplelistact/simplelistact.component';
import { ActivityService } from '../../services/domain/activity.service';
import { ActivitySimpleConsultDTO } from '../../model/activitysimpleconsult.dto';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  acts: ActivitySimpleConsultDTO[] = [];

  constructor(public auth: AuthService, 
              public storage: StorageService,
              public route: ActivatedRoute,
              public router: Router,
              public actService: ActivityService ) {    
  }

  ngOnInit() {
    let localUser: LocalUser = this.storage.getLocalUser();
    if(localUser){
      this.auth.refreshToken()
      .subscribe(res => {
        this.auth.successfulLogin(res.headers.get('Authorization'));
        this.loadActs();
      },
      error => {
        this.router.navigate(['/login']);
      })    
    } else {
      this.router.navigate(['/login']);
    }
  }  

  private loadActs(){
    this.actService
    .findAllActOfUserLogged()
    .subscribe(
        acts => {
            this.acts = acts;
        },
        err => { 
           if(err.status === 403){
            this.router.navigate(['/login']);
           }            
        }
    );
  }

  updateActivity(act: ActivitySimpleConsultDTO){
    this.router.navigate(['/activity/' + act.id]);
  }

  consultActivity(act: ActivitySimpleConsultDTO){
    this.router.navigate(['/consult/' + act.id]);
  }

}

