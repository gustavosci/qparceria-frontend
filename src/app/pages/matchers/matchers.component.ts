import { Component, OnInit } from '@angular/core';
import { MatchersDTO } from '../../model/matchers.dto';
import { MatchService } from '../../services/domain/match.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleListActComponent } from '../../global/simplelistact/simplelistact.component';

@Component({
  selector: 'app-matchers',
  templateUrl: './matchers.component.html',
  styleUrls: ['./matchers.component.css']
})
export class MatchersComponent implements OnInit {

  match: MatchersDTO = null;

  constructor(public matchService: MatchService, 
              public route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    this.loadMatchers();    
  }

  private loadMatchers(){
    this.route.params.subscribe(params => {
      let id = params["id"];
      if(id){
          this.setMatchersByActivity(id);
      } else {
        alert("Parâmetros inválidos!")
        this.router.navigate(['/']);
      }
    })
  }

  private setMatchersByActivity(id){
    this.matchService
    .matchersOfActivity(id)
    .subscribe(
        matchers => {
            this.match = matchers;
        },
        err => { 
           if(err.status === 403){
            this.router.navigate(['/login']);
           } else if(err.status === 404){
            this.router.navigate(['']);
           }            
        }
    );
  }

}
