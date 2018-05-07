import { Component, OnInit } from '@angular/core';
import { ActivityDTO } from '../../model/activity.dto';
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

  activity: ActivityDTO = {
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
      frequency: "1",
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
    sportId: ""
  }

  formActivity: FormGroup;
  newActivity: boolean;

  constructor(public storage: StorageService,
              public formBuilder: FormBuilder,
              public route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    this.loadFormActivity();    
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

}
