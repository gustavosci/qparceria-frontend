import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivitySimpleConsultDTO } from '../../model/activitysimpleconsult.dto';
import { PanelActivityComponent } from '../../global/panelactivity/panelactivity.component';
import { SimpleListActComponent } from '../../global/simplelistact/simplelistact.component';
import { ActivityService } from '../../services/domain/activity.service';
import { UFService } from '../../services/domain/uf.service';
import { ActivatedRoute, Router } from "@angular/router";
import { StorageService } from '../../services/storage.service';
import { LocalUser } from '../../model/local-user';
import { STORAGE_KEYS } from '../../config/storage-keys.config';
import { UFDTO } from '../../model/uf.dto';
import { CityDTO } from '../../model/city.dto';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  sportId: string = "1";
  ufStartId: string = "1";
  cityStartId: string = "1";
  maxDistance: string = "100.00";
  maxAverage: string = "60.00";

  ufs: UFDTO[];
  cities: CityDTO[];
  acts: ActivitySimpleConsultDTO[] = [];

  formSearch: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public route: ActivatedRoute,
              public router: Router,
              public actService: ActivityService,
              public storage: StorageService,
              public ufService: UFService) {   
  }

  ngOnInit() {
    this.getAllUfs();
    this.getUserLoggedData();
    this.setFormSearch();
  }

  private getAllUfs(){
    this.ufService.getUFs()
      .subscribe(ufs => {
        this.ufs = ufs;
        this.ufStartId = ufs[0].id;
        this.updateCities(this.ufStartId);
      })
  }

  private updateCities(ufId: string){
    this.ufService.getCitiesByUF(ufId)
      .subscribe(cities => {
        this.cities = cities;
        this.cityStartId = cities[0].id;
      })    
  }

  private getUserLoggedData(){
    let userLogged: LocalUser = this.storage.getLocalUser();
    if(userLogged){
      this.cityStartId = userLogged.cityId;
      this.ufStartId = userLogged.ufId;
    }
  }

  private setFormSearch(){
    let doubleRE: string = "[0-9]*\\.?[0-9]?[0-9]?";
    let integerRE: string = "[0-9]+";
    this.formSearch = this.formBuilder.group({
        sportId: [''],
        ufStartId: [''],
        cityStartId: [''],
        maxDistance: ['', [Validators.pattern(doubleRE)]],
        maxAverage: ['', [Validators.pattern(doubleRE)]]
    });
  }

  submit(event){
    this.actService
    .search(this.sportId, this.cityStartId, this.maxDistance, this.maxAverage)
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

  detailActivity(act: ActivitySimpleConsultDTO){    
    this.router.navigate(['/consult/' + act.id]);    
  }
}
