import { Component, OnInit } from '@angular/core';
import { ActivityDomain } from '../../model/domain/activity.domain';
import { ActivityService } from "../../services/domain/activity.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {
  act: ActivityDomain = null;

  constructor(public actService: ActivityService, 
              public route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    this.loadActivity();    
  }

  private loadActivity(){
    this.route.params.subscribe(params => {
      let id = params["id"];
      if(id){
          this.setActivityById(id);
      } else {
        alert("Parâmetros inválidos!")
        this.router.navigate(['/']);
      }
    })
  }

  private setActivityById(id){
    this.actService
    .findByIdDetail(id)
    .subscribe(
        act => {
            this.act = act;
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

  public buildActivityWeekDays(){
    let str: string = '';
    this.act.days.forEach((day: string) => {
      switch(day){
        case "MONDAY":
          str += "Segunda";
          break;
        case "TUESDAY":
          str += "Terça";
          break;
        case "WEDNESDAY":
          str += "Quarta";
          break;
        case "THURSDAY":
          str += "Quinta";
          break;
        case "FRIDAY":
          str += "Sexta";
          break;
        case "SATURDAY":
          str += "Sábado";
          break;
        case "SUNDAY":
          str += "Domingo";
          break;
      }
      str += ", ";
    }) 
    if(str !== ''){
      str = str.substring(0, str.length - 2);
      str += ".";
    } 
    return str;
  }

  consultMatchers(act: string){
    this.router.navigate(['/matchers/' + act]);
  }

}

