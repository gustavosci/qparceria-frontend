import { Component, OnInit } from '@angular/core';
import { ActivityDTO } from '../../model/activity.dto';
import { ActivityService } from "../../services/domain/activity.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Router } from "@angular/router";
import { LocalUser } from '../../model/local-user';
import { STORAGE_KEYS } from '../../config/storage-keys.config';

@Component({
  moduleId: module.id,
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  act: ActivityDTO = {
    id: "",
    referencePointStart: "",
    referencePointEnd: "",
    ufStartId: "1",
    cityStartId: "1",
    ufEndId: "1",
    cityEndId: "1",
    typeRoute: "",
    nameRoute: "",
    timeStart: "",
    schedule: {
      frequency: "SPECIFIC_DATE",
      date: "",
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    details: {
      happenOnRain: false,
      happenOnSun: false,
      happenOnHeat: false,
      happenOnCold: false,      
      forBegginers: false,
      forRegulars: false,
      forExperts: false,      
      distance: "",
      altimetry: "",
      averageSpeed: "",
      minPeople: ""
    },
    sportId: "1",
    ownerId: ""
  }
  formActivity: FormGroup;
  newActivity: boolean;

  constructor(public actService: ActivityService, 
              public storage: StorageService,
              public formBuilder: FormBuilder,
              public route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    this.newActivity = true;
    this.loadFormActivity();    
    this.loadActivityUpdate();
    this.handleChangeFrequency();
  }

  private loadFormActivity(){
    this.formActivity = this.formBuilder.group({
        referencePointStart: [],
        referencePointEnd: [],
        ufStartId: ['1'],
        cityStartId: ['1'],
        ufEndId: ['1'],
        cityEndId: ['1'],
        typeRoute: [],
        nameRoute: [],
        timeStart: [],
        sportId: ['1'],
        frequency: [],
        date: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
        happenOnRain: [],
        happenOnSun: [],
        happenOnCold: [],
        happenOnHeat: [],
        forBegginers: [],
        forRegulars: [],
        forExperts: [],
        distance: [],
        altimetry: [],
        averageSpeed: [],
        minPeople: [],
      });
  }

  private loadActivityUpdate(){
    this.route.params.subscribe(params => {
      let id = params["id"];
      if(id){
          this.setActivityById(id);
      }
    })
  }

  private setActivityById(id){
    this.actService
    .findById(id)
    .subscribe(
        act => {
            if(act.ownerId !== this.storage.getLocalUser().id){
              alert("Não é possível alterar uma atividade que você não é dono!");
              this.router.navigate(['']);
            } else {
              this.act = act;
              this.newActivity = false;  
            }
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

  submit(event) {        
    event.preventDefault();
    if(this.formActivity.valid){
      this.save();
    } else {
      alert('Existem campos inválidos! Por favor, ajuste-os e envie novamente.');
      this.markFieldsTouched();
    }
  }

  private save() {
    this.actService.save(this.act)
      .subscribe(res => {
        if(this.newActivity){
          alert("Atividade incluída com sucesso :)");
        } else {
          alert("Atividade alterada com sucesso :)");
        }
        this.router.navigate(['']);
      }, error => {
        if(!this.newActivity && error.status === 403){
          alert('Sessão expirada!\nFavor logar novamente.');
        }
      })
  }

  private markFieldsTouched() {
    Object.keys(this.formActivity.controls).forEach(field => {
      const control = this.formActivity.get(field);
      control.markAsTouched();
    })
  }

  handleChangeFrequency(){
    if(this.act.schedule.frequency === "SPECIFIC_DATE"){
      this.enableDateAndDisableWeekDays();
    } else {
      this.enableWeekDaysAndDisableDate();
    }
  }

  private enableDateAndDisableWeekDays(){
    this.act.schedule.monday = false;
    this.act.schedule.tuesday = false;
    this.act.schedule.wednesday = false;
    this.act.schedule.thursday = false;
    this.act.schedule.friday = false;
    this.act.schedule.saturday = false;
    this.act.schedule.sunday = false;      
    this.formActivity.controls.date.enable();
    this.formActivity.controls.monday.disable();
    this.formActivity.controls.tuesday.disable();
    this.formActivity.controls.wednesday.disable();
    this.formActivity.controls.thursday.disable();
    this.formActivity.controls.friday.disable();
    this.formActivity.controls.saturday.disable();
    this.formActivity.controls.sunday.disable();    
  }

  private enableWeekDaysAndDisableDate(){
    this.act.schedule.date = "";
    this.formActivity.controls.date.disable();
    this.formActivity.controls.monday.enable();
    this.formActivity.controls.tuesday.enable();
    this.formActivity.controls.wednesday.enable();
    this.formActivity.controls.thursday.enable();
    this.formActivity.controls.friday.enable();
    this.formActivity.controls.saturday.enable();
    this.formActivity.controls.sunday.enable();
  }

}
