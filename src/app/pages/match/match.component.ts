import { Component, OnInit } from '@angular/core';
import { MatchDTO } from '../../model/match.dto';
import { MatchService } from '../../services/domain/match.service';
import { LocalUser } from '../../model/local-user';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { PanelActivityComponent } from '../../global/panelactivity/panelactivity.component';
import { SimpleListActComponent } from '../../global/simplelistact/simplelistact.component';

@Component({
  moduleId: module.id,
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  matches: MatchDTO[] = [];

  constructor(public auth: AuthService, 
              public storage: StorageService,
              public route: ActivatedRoute,
              public router: Router,
              public matchService: MatchService ) {    
}

  ngOnInit() {
    let localUser: LocalUser = this.storage.getLocalUser();
    if(localUser){
      this.auth.refreshToken()
      .subscribe(res => {
        this.auth.successfulLogin(res.headers.get('Authorization'));
        this.loadMatches();
      },
      error => {
        this.router.navigate(['/login']);
      })    
    } else {
      this.router.navigate(['/login']);
    }
  }  

  private loadMatches(){
    if (this.isReceivedMatches()){
      this.loadMatchesReceived();
    } else {
      this.loadMatchesProduced();
    }
  }

  private isReceivedMatches(){
    let isReceived: boolean;
    this.route.params.subscribe(params => {
      let consult = params["consult"];
      if(consult === "received"){
        isReceived = true;
      } else { // Todos outros casos, mostra matches efetuados pelo usuário
        isReceived = false;   
      }
    })
    return isReceived;
  }

  private loadMatchesReceived(){
    this.matchService
    .received()
    .subscribe(
        matches => {
            this.matches = matches;
        },
        err => { 
            if(err.status === 403){
            this.router.navigate(['/login']);
            }            
        }
    );
  }

  private loadMatchesProduced(){
    this.matchService
    .produced()
    .subscribe(
        matches => {
            this.matches = matches;
        },
        err => { 
            if(err.status === 403){
            this.router.navigate(['/login']);
            }            
        }
    );
  }

  consultActivity(act: string){
    this.router.navigate(['/consult/' + act]);
  }

}
