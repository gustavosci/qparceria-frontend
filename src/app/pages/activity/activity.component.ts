import { Component, OnInit } from '@angular/core';
import { ActivityDTO } from '../../model/activity.dto';
import { ActivityService } from "../../services/domain/activity.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Router } from "@angular/router";
import { LocalUser } from '../../model/local-user';
import { STORAGE_KEYS } from '../../config/storage-keys.config';
import { SportService } from '../../services/domain/sport.service';
import { SportDTO } from '../../model/sport.dto';
import { UFService } from '../../services/domain/uf.service';
import { UFDTO } from '../../model/uf.dto';
import { CityDTO } from '../../model/city.dto';

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
  maskDate: string; // criado para indicar dinamicante a mascará do campo de data. Fixando no HTML, não estava permitindo desabilitar o campo  

  ufs: UFDTO[];
  citiesStart: CityDTO[];
  citiesEnd: CityDTO[];
  sports: SportDTO[];

  constructor(public actService: ActivityService, 
              public storage: StorageService,
              public formBuilder: FormBuilder,
              public route: ActivatedRoute,
              public router: Router,
              public ufService: UFService,
              public sportService: SportService) {   
 }

  ngOnInit() {
    this.getAllSports();
    this.getAllUfs();
    this.newActivity = true;
    this.loadFormActivity();    
    this.loadActivityUpdate();    
  }

  private getAllSports(){
    this.sportService.getSports()
    .subscribe(sports => {
      this.sports = sports;
      this.act.sportId = sports[0].id;
    })
  }

  private getAllUfs(){
    this.ufService.getUFs()
      .subscribe(ufs => {
        this.ufs = ufs;
        this.act.ufStartId = ufs[0].id;
        this.updateCitiesStart(this.act.ufStartId);
        this.act.ufEndId = ufs[0].id;
        this.updateCitiesEnd(this.act.ufEndId);
      })
  }

  private updateCitiesStart(ufId: string){
    this.ufService.getCitiesByUF(ufId)
      .subscribe(cities => {
        this.citiesStart = cities;
        this.act.cityStartId = cities[0].id;
      })    
  }

  private updateCitiesEnd(ufId: string){
    this.ufService.getCitiesByUF(ufId)
      .subscribe(cities => {
        this.citiesEnd = cities;
        this.act.cityEndId = cities[0].id;
      })    
  }

  private loadFormActivity(){
    let doubleRE: string = "[0-9]*\\.?[0-9]?[0-9]?";
    let integerRE: string = "[0-9]+";
    this.formActivity = this.formBuilder.group({
        referencePointStart: ['', [Validators.maxLength(25)]],
        referencePointEnd: ['', [Validators.maxLength(25)]],
        ufStartId: [],
        cityStartId: [],
        ufEndId: [],
        cityEndId: [],
        typeRoute: ['', [Validators.maxLength(25)]],
        nameRoute: ['', [Validators.maxLength(25)]],
        timeStart: [],
        sportId: [],
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
        distance: ["", [Validators.pattern(doubleRE)]],
        altimetry: ["", [Validators.pattern(doubleRE)]],
        averageSpeed: ["", [Validators.pattern(doubleRE)]],
        minPeople: ["", [Validators.pattern(integerRE)]],
      });
  }

  private loadActivityUpdate(){
    this.route.params.subscribe(params => {
      let id = params["id"];
      if(id){
          this.setActivityById(id);
      } else {
        this.handleChangeFrequency();
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
              this.updateCitiesStart(act.ufStartId);
              this.updateCitiesEnd(act.ufEndId);
              this.act = act;
              this.newActivity = false;  
              this.handleChangeFrequency();
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
    this.maskDate = "99/99/9999";
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
    this.maskDate = "";
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
