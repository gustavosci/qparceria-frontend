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
    ufStartId: "",
    cityStartId: "",
    ufEndId: "",
    cityEndId: "",
    typeRoute: "",
    nameRoute: "",
    timeStart: "",
    totalTime: "",
    schedule: {
      frequency: "0",
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
    sportId: "",
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
  }

  private loadFormActivity(){
    this.formActivity = this.formBuilder.group({
        referencePointStart: [],
        referencePointEnd: [],
        ufStartId: ['1', Validators.compose([Validators.required])],
        cityStartId: ['1', Validators.compose([Validators.required])],
        ufEndId: ['1', Validators.compose([Validators.required])],
        cityEndId: ['1', Validators.compose([Validators.required])],
        typeRoute: [],
        nameRoute: [],
        timeStart: [],
        totalTime: [],
        sportId: ['1', Validators.compose([Validators.required])],
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
            this.act = act;
            this.newActivity = false;
        },
        err => { 
           if(err.status === 403){
            this.router.navigate(['/login']);
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
    // TODO: Ver como buscar campo date
    if(this.act.schedule.frequency === "2"){
      this.formActivity.get("date").disabled;      
    } else {
      this.formActivity.get("date").enable;
    }
  }

}
