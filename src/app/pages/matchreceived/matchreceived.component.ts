import { Component, OnInit } from '@angular/core';
import { MatchDTO } from '../../model/match.dto';
import { ActivatedRoute, Router } from "@angular/router";
import { MatchService } from '../../services/domain/match.service';

@Component({
  selector: 'app-matchreceived',
  templateUrl: './matchreceived.component.html',
  styleUrls: ['./matchreceived.component.css']
})
export class MatchReceivedComponent implements OnInit {

  matches: MatchDTO[] = [];

  constructor(public route: ActivatedRoute,
              public router: Router,
              public matchService: MatchService ) {    
}

  ngOnInit() {
    this.loadMatches();
  }  

  private loadMatches(){
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

  consultActivity(act: string){
    this.router.navigate(['/consult/' + act]);
  }

  updateActivity(act: string){
    this.router.navigate(['/activity/' + act]);
  }

  consultMatchers(act: string){
    this.router.navigate(['/matchers/' + act]);
  }

}
